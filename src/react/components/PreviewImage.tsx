import { Button, Card, Center, Group, Text } from "@mantine/core";
import React from "react";

export interface PreviewImageProps {
    image: any;
    okFunction: any;
    cancelFunction: any;
}

const PreviewImage = (props: PreviewImageProps) => {
    return <>
    <Card shadow="md" p="lg" radius={"md"} withBorder>
        <Card.Section>
          <Center>
            <img src={props.image} alt=""/>
          </Center>
        </Card.Section>
        <Group position='apart' mt='md' mb={'xs'}>
          <Text>Preview</Text>
        </Group>
        <Button size='sm' mr={'md'} color='gray' onClick={props.okFunction}>
          Adicionar
        </Button>
        <Button size='sm' color='gray' onClick={props.cancelFunction}>
          Ajustar dados
        </Button>
      </Card>
    </>
};

export default PreviewImage;