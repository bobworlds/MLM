import {Link, useLoaderData} from '@remix-run/react';
import { Image } from '@shopify/hydrogen';

export function meta() {
    return [
      {title: 'MERCI LE MERCH || ASSETS'},
      
    ];
  }

  export async function loader({context}) {
    return await context.storefront.query(COLLECTIONS_QUERY);
  }

export default function Assets() {
    const {collections} = useLoaderData();
    console.log(collections);
    return (
        <section className="w-full gap-4">
       
        <div className="flex flex-wrap">
          {collections.nodes.map((collection) => {
            return (
              <Link to={`/collections/${collection.handle}`} key={collection.id}>
                <div className="grid gap-4">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      key={collection.id}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      crop="center"
                      className='object-cover'
                    />
                  )}
                  <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                    {collection.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    )
}

const COLLECTIONS_QUERY = `#graphql
query CollectionList {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        image {
          altText
          url
        }
      }
    }
  }

`