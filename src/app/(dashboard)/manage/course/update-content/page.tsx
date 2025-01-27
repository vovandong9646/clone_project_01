import React from 'react';

type IParamProps = Promise<{ slug: string }>;
const page = async ({ searchParams }: { searchParams: IParamProps }) => {
  const { slug } = await searchParams;
  console.log('🚀 ~ page ~ slug:', slug);
  return <div>lecture page</div>;
};

export default page;
