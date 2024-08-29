"use client";

import { useCreateSessionMutation } from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import Button from "@frontend/components/Form/Button/Button";
import ImageInput from "@frontend/components/Form/ImageInput/ImageInput";
import TextInput from "@frontend/components/Form/TextInput/TextInput";
import Layout from "@frontend/components/Layout/Layout";
import { Text, Title } from "@frontend/components/Text/Text";
import { shrinkImage } from "@frontend/utils/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface CreateFieldValues {
  name: string;
  files: FileList;
}

const CreateSessionPage = () => {
  const router = useRouter();
  const createSessionMutation = useCreateSessionMutation();
  const methods = useForm<CreateFieldValues>();
  const { register, formState, handleSubmit, watch } = methods;

  const onSubmit = async (fieldValues: CreateFieldValues) => {
    const name = fieldValues.name;
    const formData = new FormData();
    formData.append("name", name);
    if (fieldValues.files.length) {
      const mapImage = await shrinkImage(fieldValues.files[0]);
      formData.append("mapImage", mapImage);
    }
    await createSessionMutation.mutateAsync(formData);
    router.push("/");
  };

  useEffect(() => {
    watch("files");
  }, [watch]);

  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <Title>Create session</Title>
            <Text>
              <Link href={"/"}>Back to overview</Link>
            </Text>
            <TextInput {...register("name")} placeholder="Name" />
            <Text>Map (optional)</Text>
            <ImageInput {...register("files")} />
            <Button
              disabled={formState.isSubmitting || !formState.isValid}
              type="submit"
            >
              Submit
            </Button>
          </Card>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default CreateSessionPage;
