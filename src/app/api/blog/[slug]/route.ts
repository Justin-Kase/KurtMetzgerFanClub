import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const filePath = path.join(process.cwd(), 'public', 'blog', `${slug}.md`)
    
    const content = await fs.readFile(filePath, 'utf-8')
    
    return NextResponse.json({ 
      content,
      slug 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Blog post not found' },
      { status: 404 }
    )
  }
}
