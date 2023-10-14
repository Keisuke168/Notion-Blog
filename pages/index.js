import Image from 'next/image'
import Container from '../components/Container'
import Link from 'next/link'
import { getNotionData } from '../lib/getNotionData'

export default function Home({ posts }) {
  return (
    <Container>
      <div className="mx-auto mb-16 max-w-2xl">

        <div className="mb-16">
          <h1 className="mx-auto mb-2 w-full max-w-xl text-3xl font-bold tracking-tight text-black md:text-center md:text-5xl">
            Keisuke Tech Blog
          </h1>
          <p className="mx-auto mb-5 max-w-xl text-gray-700 md:text-center">
          This is my study note and blog for output. I have a wide range of interests, from front-end development to machine learning, so I will be posting various topics. Lately, I have been particularly interested in Three.js and shaders, and I am studying to create cool websites using them. I plan to write about my progress in that area.
          </p>
        </div>
        <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight text-black md:text-3xl">
          Blog Posts
        </h2>

        {!posts.length && <p className="mb-4 text-gray-600">No posts found.</p>}

        {posts.map((post) => {
          const postImage = post.properties['Cover Image'].files[0]
          const postImageUrl =
            postImage?.type === 'file' ? postImage.file.url : postImage?.external.url
          return (
            <div key={post.id} className="mb-8 sm:flex">
              {postImageUrl && (
                <Link
                  className="mb-10 block w-full sm:mb-0 sm:mr-5 sm:w-1/3"
                  href={`/${post.properties.Slug.rich_text[0].plain_text}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={postImageUrl} />
                </Link>
              )}
              <Link className="w-full" href={`/${post.properties.Slug.rich_text[0].plain_text}`}>
                <div className="w-full">
                  <h3 className="w-full text-xl font-medium text-gray-900">
                    {post.properties.Post.title[0].plain_text}
                  </h3>
                  <p className="text-gray-700">
                    {post.properties.Description.rich_text[0].plain_text}
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID)

  return {
    props: {
      posts: database,
    },
  }
}
