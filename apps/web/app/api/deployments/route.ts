import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const deployments = await prisma.deployment.findMany({
      include: {
        application: true,
        server: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(deployments);
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
    const { applicationId, serverId } =
      await req.json();

    const deployment =
      await prisma.deployment.create({
        data: {
          applicationId,
          serverId,
        },
      });

    return NextResponse.json(deployment);
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
    const { id, status } =
      await req.json();

    const deployment =
      await prisma.deployment.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

    return NextResponse.json(deployment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest
) {
  try {
    const { id } = await req.json();

    await prisma.deployment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Deployment deleted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}