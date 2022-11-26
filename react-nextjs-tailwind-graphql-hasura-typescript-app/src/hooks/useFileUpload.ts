import useGraphQLClient from '@/hooks/useGraphQLClient';

type Brand = {
  id: string;
  name: string;
  logo: File;
};

const useFileUpload = () => {
  const {
    graphQLClient: {client},
  } = useGraphQLClient();

  const CreateBrandMutation = `
  input BrandCreateInput {
    name: String!
    logo: Upload!
  }
  
  mutation ($input: BrandCreateInput!) {
    brandCreate(input: $input) {
      id
      name
      logo
    }
  }

  mutation ($input: BrandCreateInput!) {
    brandCreate(input: $input) {
      id
      name
      logo
    }
  }`;

  const createBrand = async (name: string, logo: File): Promise<Brand> => {
    const {data = {}, error} = await client
      .mutation(CreateBrandMutation, {
        input: {
          name,
          logo,
        },
      })
      .toPromise();

    if (error) {
      // Do actual error handling here
      throw error;
    }

    return data.brandCreate;
  };
  return {
    createBrand,
  };
};

export default useFileUpload;
