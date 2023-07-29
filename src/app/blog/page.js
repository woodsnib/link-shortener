import getDomain from "../lib/getDomain"
import Card from "./card"
import { helloWorld } from "../lib/db"

async function getData() {
    //1 endpoint - api
    const domain = getDomain()
    const endpoint = `${domain}/api/posts`
    const res = await fetch(endpoint, {cache: 'no-store'})

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    if (res.headers.get("content-type") !== "application/json") {
        return {items: []}
    }

    return res.json()
}


export default async function BlogPage() {
    const data = await getData()
    const dbHello = await helloWorld()
    console.log('dbHello', dbHello)
    const items = data && data.items ? [...data.items] : []
    return <main>
        <h1>Hello, world!</h1>
        <p>DB Response: {JSON.stringify(dbHello)}</p>
        <p>Posts: </p>
        {items && items.map((item, idx)=>{
            return <Card title={item.title} key={`post-${idx}`} />
        })}
    </main>
}   

export const runtime = 'edge'
export const preferredRegion = "auto"