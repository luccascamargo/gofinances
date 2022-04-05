import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import {Container, Header, Title, Form, Fields, TransactionsTypes} from './styles'
import {CategorySelect} from '../CategorySelect'
import { InputForm } from "../../components/InputForm";

interface FormDate {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('O nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor numerico')
  .positive('Informe um valor positivo')
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleRegister(form:FormDate) {
    if(!transactionType){
      return Alert.alert('Erro', 'Selecione um tipo de transação');
    }

    if(category.key === 'category'){
      return Alert.alert('Erro', 'Selecione uma categoria')
    }
    
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data);
    
  }

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />

          <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />

          <TransactionsTypes>
            <TransactionTypeButton 
              isActive={transactionType === 'up'}
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton 
              isActive={transactionType === 'down'}
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </TransactionsTypes>
          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
        </Fields>

        <Button 
          title="Enviar"
          onPress={handleSubmit(handleRegister)}  
        />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  </TouchableWithoutFeedback>
  )
}