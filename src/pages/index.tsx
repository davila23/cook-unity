import Layout from '@/components/layout'

// Unfortunately I did not have enough time to implement this view, 
// the idea was to show a list with the statistics and the country with the highest number of IPs
export default function IndexPage() {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <main>
                <div className='flex min-h-screen flex-col items-center justify-center text-center'>
                    <h1 className="text-2xl">Hello - Cook Unity 👋</h1>
                    <p className='mt-4 text-gray-800'>
                        Stack: Next.js, Tailwind CSS, and TypeScript
                    </p>
                    <p className='mt-2 text-gray-700'>
                        Daniel Avila (daniel.avila@rottay.com)
                    </p>
                </div>
      </main>
    </Layout>
  )
}
