import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Incoming body:", body);

        if (!body) {
            return NextResponse.json(
                { error: "Request body is empty" },
                { status: 400 }
            );
        }

        // TRACK EVENTS
        if (body.results && Array.isArray(body.results)) {
            const { ageGroup, gender, distance, results } = body;

            const event = await prisma.event.create({
                data: {
                    name: `${ageGroup} ${gender} ${distance}`,
                    type: "track",
                },
            });

            for (const result of results) {
                if (result?.team && result?.runner && result?.time) {
                    const participant = await prisma.participant.create({
                        data: {
                            name: result.runner,
                            type: "individual",
                            eventId: event.id,
                            createdBy: 1,
                        },
                    });

                    await prisma.score.create({
                        data: {
                            points: parseInt(result.time.replace(":", "")),
                            participantId: participant.id,
                            eventId: event.id,
                            recordedBy: 1,
                        },
                    });
                }
            }
        }

        // FIELD EVENTS
        else if (body.entries && Array.isArray(body.entries)) {
            const { eventType, title, entries } = body;

            const event = await prisma.event.create({
                data: {
                    name: title,
                    type: eventType,
                },
            });

            for (const entry of entries) {
                if (entry?.team && entry?.name && entry?.distance) {
                    const participant = await prisma.participant.create({
                        data: {
                            name: entry.name,
                            type: "individual",
                            eventId: event.id,
                            createdBy: 1,
                        },
                    });

                    await prisma.score.create({
                        data: {
                            points: parseFloat(entry.distance),
                            participantId: participant.id,
                            eventId: event.id,
                            recordedBy: 1,
                        },
                    });
                }
            }
        }

        else {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        return NextResponse.json({ message: "Saved successfully" });

    } catch (error) {
        console.error("API error:", error);

        return NextResponse.json(
            { error: "Server error", details: String(error) },
            { status: 500 }
        );
    }
}