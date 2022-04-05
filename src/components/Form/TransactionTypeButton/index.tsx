import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler'
import { Container, Title, Icon, Button } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface Props extends RectButtonProps {
  isActive: boolean;
  title: string;
  type: 'up' | 'down';
}

export function TransactionTypeButton({type, isActive, title, ...rest} : Props) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>
          {title}
        </Title>
      </Button>
    </Container>
  )
}