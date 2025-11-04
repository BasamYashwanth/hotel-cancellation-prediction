import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { spawn } from "child_process";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload CSV or Excel file." },
        { status: 400 }
      );
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempDir = path.join(process.cwd(), "tmp");
    const filename = `upload_${Date.now()}_${file.name}`;
    const filepath = path.join(tempDir, filename);

    // Create tmp directory if it doesn't exist
    await writeFile(filepath, buffer);

    // Execute Python script
    const pythonScript = path.join(
      process.cwd(),
      "src/lib/python/predict_cancellations.py"
    );

    const result = await new Promise<string>((resolve, reject) => {
      const python = spawn("python3", [pythonScript, filepath]);
      let output = "";
      let errorOutput = "";

      python.stdout.on("data", (data) => {
        output += data.toString();
      });

      python.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      python.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${errorOutput}`));
        } else {
          resolve(output);
        }
      });

      python.on("error", (err) => {
        reject(err);
      });
    });

    // Clean up temporary file
    try {
      await unlink(filepath);
    } catch (err) {
      console.error("Error deleting temp file:", err);
    }

    // Parse and return result
    const parsedResult = JSON.parse(result);

    if (parsedResult.error) {
      return NextResponse.json(
        { error: parsedResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Batch prediction error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process file" },
      { status: 500 }
    );
  }
}
