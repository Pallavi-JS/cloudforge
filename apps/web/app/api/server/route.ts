import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const servers = await prisma.server.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(servers);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, ipAddress } = await req.json();

    const server = await prisma.server.create({
      data: {
        name,
        ipAddress,
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        responseTime: Math.floor(Math.random() * 200),
      },
    });
    

    const healthScore =
      100
      - server.cpuUsage * 0.4
      - server.memoryUsage * 0.3
      - server.responseTime * 0.1
      + server.uptime * 0.2;

    await prisma.server.update({
      where: {
        id: server.id,
      },
      data: {
        healthScore: Math.floor(healthScore),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, ipAddress } =
      await req.json();

    const server = await prisma.server.update({
      where: {
        id,
      },
      data: {
        name,
        ipAddress,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.server.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Server deleted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}