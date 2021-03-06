import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { 
  Container,
  Header,
  UserInfo,
  Photo,
  UserGreeting,
  UserName,
  User,
  UserWrapper,
  Icon, 
  HighlightsCard,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboards() {
  const data:DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title:'Desenvolvimento de Site',
      amount:'R$ 12.000,00',
      category:{
        name:'Vendas',
        icon:'dollar-sign'
      },
      date:"13/04/2020"
    },
    {
      id: '2',
      type:'negative',
      title:'Pizza',
      amount:'R$ 59,00',
      category:{
        name:'Alimentacao',
        icon:'coffee'
      },
      date:"13/04/2020"
    },
    {
      id: '3',
      type:'negative',
      title:'Aluguel apartamento',
      amount:'R$ 1.200,00',
      category:{
        name:'Casa',
        icon:'shopping-bag'
      },
      date:"13/04/2020"
    }
  ]
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/47279802?v=4'}}/>
            <User>
              <UserGreeting>Ola, </UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>

        <LogoutButton onPress={() => console.log("clicando")}>
          <Icon name='power'/>
        </LogoutButton>

        </UserWrapper>
      </Header>

      <HighlightsCard>
        <HighlightCard 
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Ultima entrada dia 13 de abril'
        />
        <HighlightCard 
        type='down'
          title='Saidas'
          amount='R$ 1.500,00'
          lastTransaction='Ultima entrada dia 13 de abril'/>

        <HighlightCard 
          type='total'
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 a 16 de abril'/>
      </HighlightsCard>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
          data={data} 
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item} />} 
        />
      </Transactions>
    </Container>
  )
}