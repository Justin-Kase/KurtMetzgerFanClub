import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body as { email?: string }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address required' },
        { status: 400 }
      )
    }

    // TODO: Integrate with Mailchimp / ConvertKit / etc.
    // Example with Mailchimp:
    // await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
    //   email_address: email,
    //   status: 'subscribed',
    // })

    console.log(`Newsletter subscription: ${email}`)

    return NextResponse.json(
      { success: true, message: 'Your soul now belongs to the Church of Metzger.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
