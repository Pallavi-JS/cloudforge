import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    const application = await prisma.application.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(application, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.application.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Application deleted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const { id, name, description } =
      await req.json();

    const application =
      await prisma.application.update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
      });

    return NextResponse.json(application);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}