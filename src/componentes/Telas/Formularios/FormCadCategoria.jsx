import { useState, useEffect } from 'react';

import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { gravarCategoria } from '../../../servicos/servicoCategoria';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadCategoria(props) {
    const [categoria, setCategoria] = useState(props.categoriaSelecionada);
    const [formValidado, setFormValidado] = useState(false);

    useEffect(() => {
        setCategoria(props.categoriaSelecionada);
    }, [props.categoriaSelecionada]);
    

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o categoria
                gravarCategoria(categoria)
                .then((resultado)=>{
                    if (resultado.status){
                        //exibir tabela com o categoria incluído
                        props.setExibirTabela(true);
                    }
                    else{
                        toast.error(resultado.mensagem);
                    }
                });
            } 
            else {
                // Editar a categoria
                props.setListaDeCategorias(props.listaDeCategorias.map((item) => 
                    item.codigo !== categoria.codigo ? item : categoria
                ));
                // Resetar para modo de inclusão
                props.setModoEdicao(false);
                props.setCategoriaSelecionada({ 
                    codigo: 0, 
                    descricao: "" 
                });
                props.setExibirTabela(true);
            }
            
        } 
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setCategoria({ ...categoria, [name]: value });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={categoria.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>
                        Por favor, informe o código da categoria!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={categoria.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a descrição da categoria!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
    );
}