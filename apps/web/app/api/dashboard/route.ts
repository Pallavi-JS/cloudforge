import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.application.count();
    const servers = await prisma.server.count();
    const deployments = await prisma.deployment.count();

    return NextResponse.json({
      applications,
      deployments,
      servers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}