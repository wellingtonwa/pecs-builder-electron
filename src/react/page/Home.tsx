import React, { FC } from "react";
import { Button, Card, Center, Space, TextInput, Group, Switch, FileInput, Select, ColorPicker, Textarea } from "@mantine/core";
import { GlobalState, globalActions } from '../../react/store/slice/global.slice';
import { RootState } from '../../react/store';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { FONTS } from "../../constants";
import { Navigate, useNavigate } from "react-router-dom";
import Picture from "../../model/picture";
import FontProps from "../../model/fontProps";

const Home: FC = () => {

    const { pictures, currentPicture } = useSelector<RootState, GlobalState>(state => state.global)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useForm({  
        initialValues: {
          text: currentPicture?.title || '',
          imageFile: null,
          font: currentPicture?.font || 'FONT_SANS_32_BLACK',
          backgroundColor: null,
          withBorder: currentPicture?.withBorder || true
        },
        validate: {
          text: (value) => value === null ||  value === '' ? 'Campo Obrigatório' : null,
          imageFile: (value) => value === null && currentPicture === null ? 'Clique no campo para selecionar uma imagem' : null,
          font: (value) => value === null ? 'Selecione uma fonte' : null,
        }
      });
    
    const submitFunction = async (values: any) => {    
        console.log("Submited values: ", values);
        const {text, font, backgroundColor, withBorder} = values;
        const path = currentPicture?.filePath || values?.imageFile?.path;
        let result = await pecsBuilder.image.previewImage({text, imagePath: path, font, backgroundColor, withBorder});
        let picture: Picture = { font: values.font, title: values.text, filePath: path, base64: result};
        dispatch(globalActions.setCurrentPicture(picture));
        navigate('/preview');
    }
    return (
        <>
          <Card mx="auto" mt={'md'}>
            <form onSubmit={form.onSubmit(submitFunction)}>
              <Textarea
                withAsterisk
                label="Texto"
                {...form.getInputProps('text')}
              />

              {currentPicture === null && <FileInput 
                label="Imagem:"
                accept='image/png,image/jpeg,image/webp'
                withAsterisk
                {...form.getInputProps('imageFile')}
              />}
                
              <Select
                  data={FONTS.map((obj: FontProps) => ({ value: obj.value, label: obj.description, key: obj.value}))}
                  label='Fonte:'
                  {...form.getInputProps('font')}
              />

              <Switch
                checked={form.values.withBorder}
                {...form.getInputProps('withBorder')} mt="md"
                label="Adicionar Borda"/>

                <ColorPicker format="hexa"
                             {...form.getInputProps('backgroundColor')} mt="md"/>
                
              <Group mt="md">
                {pictures.length > 0 && <Button onClick={() => console.log("nada")}>Galeria ({pictures.length})</Button>}
                <Button type="submit">Enviar</Button>
              </Group>
            </form>
          </Card>
        </>
    )

}

export default Home;
