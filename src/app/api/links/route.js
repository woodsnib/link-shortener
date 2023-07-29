import { NextResponse } from "next/server";
import isValidURL from "@/app/lib/isValidURL";
import { addLink } from "@/app/lib/db";
import { getMinLinks } from "@/app/lib/db";

export async function GET(request) {
    const links = await getMinLinks(100, 0)
    return NextResponse.json(links, {status: 200})
}

export async function POST(request) {

    const contentType = await request.headers.get("content-type")
    if (contentType !== "application/json") {
        return NextResponse.json({"error": "Invalid request"}, 
        {status: 415})
    }
    const data = await request.json()
    const url = data && data.url ? data.url : null
    const validURL = await isValidURL(url, ["link-shortener", process.env.NEXT_PUBLIC_VERCEL_URL])
    if (!validURL) {
        return NextResponse.json({"message": `${url} is not valid.`}, 
        {status: 400})
    }
    const dbResponse = await addLink(url)
    return NextResponse.json(dbResponse, {status: 201})

}