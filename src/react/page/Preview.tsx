import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { GlobalState, globalActions } from "../store/slice/global.slice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Center} from "@mantine/core";

const Preview: FC = () => {
  const { currentPicture } = useSelector<RootState, GlobalState>(state => state.global)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPicture === null || currentPicture === undefined) {
      navigate('/'); 
    }
  }, []);


  const okFunction = () => {
    dispatch(globalActions.setCurrentPicture(null))
    navigate('/');
  };

  const salvarFunction = async () => {
    pecsBuilder.image.salvarImagem(currentPicture);
  }

  return (
    <>
      <Card shadow="md" p="lg" radius={"md"} withBorder>
        <Card.Section>
          <Center>
            <img src={currentPicture?.base64} alt=""/>
          </Center>
        </Card.Section>
        <Button size="sm" color="green" onClick={salvarFunction }>
          Salvar
        </Button>
        <Button size='sm' color='gray' onClick={() => navigate('/')}>
          Ajustar dados
        </Button>
        <Button size='sm' mr={'md'} color='gray' onClick={okFunction}>
          Adicionar outra imagem
        </Button>
      </Card>
    </>
  )

}

export default Preview;