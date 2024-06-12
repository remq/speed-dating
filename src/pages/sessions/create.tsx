import { useCreateSessionMutation } from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import Button from "@frontend/components/Form/Button/Button";
import ImageInput from "@frontend/components/Form/ImageInput/ImageInput";
import TextInput from "@frontend/components/Form/TextInput/TextInput";
import Layout from "@frontend/components/Layout/Layout";
import { Text, Title } from "@frontend/components/Text/Text";
import { shrinkImage } from "@frontend/utils/image";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

interface CreateFieldValues {
  name: string;
  files: FileList;
}

const CreateSessionPage: NextPage = () => {
  const router = useRouter();
  const createSessionMutation = useCreateSessionMutation();
  const methods = useForm<CreateFieldValues>();
  const { register, formState, handleSubmit } = methods;

  const onSubmit = async (fieldValues: CreateFieldValues) => {
    const name = fieldValues.name;
    let mapImage: Blob | undefined = undefined;
    if (fieldValues.files.length) {
      mapImage = await shrinkImage(fieldValues.files[0]);
    }
    await createSessionMutation.mutateAsync({ name, mapImage });
    router.push("/");
  };

  return (
    <Layout>
      <Card>
        <Title>Create session</Title>
        <Text>
          <Link href={"/"}>Back to overview</Link>
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput {...register("name")} placeholder="Name" />
            <Text>Map (optional)</Text>
            <ImageInput
              {...register("files", {
                validate: (value) => value.length <= 1,
              })}
            />
            <Button disabled={formState.isSubmitting} type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </Card>
    </Layout>
  );
};

export default CreateSessionPage;
