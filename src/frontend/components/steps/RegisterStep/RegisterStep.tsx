import { useRegisterMutation } from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import Button from "@frontend/components/Form/Button/Button";
import ImageInput from "@frontend/components/Form/ImageInput/ImageInput";
import TextInput from "@frontend/components/Form/TextInput/TextInput";
import Layout from "@frontend/components/Layout/Layout";
import { Text, Title } from "@frontend/components/Text/Text";
import { useSession } from "@frontend/context/SessionContext";
import { setCookie } from "@frontend/utils/cookies";
import { shrinkImage } from "@frontend/utils/image";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface RegisterFieldValues {
  name: string;
  files: FileList;
}

const RegisterStep: FC = () => {
  const { session, invalidateSession } = useSession();
  const registerMutation = useRegisterMutation();
  const methods = useForm<RegisterFieldValues>();
  const { register, formState, handleSubmit } = methods;

  const onSubmit = async (fieldValues: RegisterFieldValues) => {
    const name = fieldValues.name;
    const userImage = await shrinkImage(fieldValues.files[0]);

    const user = await registerMutation.mutateAsync({
      sessionId: session!.sessionId,
      name,
      userImage,
    });

    setCookie(session!.sessionId, user.userId);
    invalidateSession();
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <Title>Join</Title>
            <Text>
              Enter your name, snap a picture and join the Speed Dating.
            </Text>
            <TextInput
              {...register("name", { validate: (value) => value?.length > 0 })}
              placeholder="Name"
            />
            <ImageInput
              {...register("files", {
                validate: (value) => value.length === 1,
              })}
            />
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

export default RegisterStep;
