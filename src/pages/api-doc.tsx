import {GetStaticProps, InferGetStaticPropsType} from 'next';
import dynamic from 'next/dynamic';
import {createSwaggerSpec} from 'next-swagger-doc';
import 'swagger-ui-react/swagger-ui.css';


const SwaggerUI = dynamic<{
  spec: any;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
}>(import('swagger-ui-react'), {ssr: false});

// eslint-disable-next-line func-style
function ApiDoc({spec}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec}/>;
}

// eslint-disable-next-line require-await
export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'src/pages/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SSC AWS: Nextjs',
        description: 'Github repository: https://github.com/securityscorecard/ssc-app-aws',
        version: '1.0',
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;