
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://localhost:8080/api/ocorrencias';

const TIPOS_RISCO = [
  'EPI inadequado',
  'Postura ergonômica',
  'Área perigosa',
  'Vazamento',
  'Outro',
];

export default function App() {
  const [tipo, setTipo] = useState(TIPOS_RISCO[0]);
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ocorrencias, setOcorrencias] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregarOcorrencias() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }

      const dados = await resposta.json();
      setOcorrencias(Array.isArray(dados) ? dados : []);
    } catch (e) {
      setErro(
        'Não foi possível conectar ao backend. Confira se o servidor está rodando.'
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarOcorrencias();
  }, []);

  async function cadastrarOcorrencia() {
    if (!local.trim() || !descricao.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o local e a descrição da ocorrência.'
      );
      return;
    }

    setSalvando(true);

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipoRisco: tipo,
          local: local.trim(),
          descricao: descricao.trim(),
        }),
      });

      if (!resposta.ok) {
        const mensagem = await resposta.text();
        throw new Error(mensagem || `Erro HTTP ${resposta.status}`);
      }

      setLocal('');
      setDescricao('');
      Alert.alert('Sucesso', 'Ocorrência cadastrada.');

      await carregarOcorrencias();
    } catch (e) {
      Alert.alert(
        'Não foi possível cadastrar',
        e.message || 'Verifique se o backend está funcionando.'
      );
    } finally {
      setSalvando(false);
    }
  }

  function renderOcorrencia({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTipo}>
          {item.tipoRisco || item.tipo || 'Ocorrência'}
        </Text>

        <Text style={styles.cardTexto}>
          Local: {item.local || 'Não informado'}
        </Text>

        <Text style={styles.cardTexto}>
          Descrição: {item.descricao || 'Não informada'}
        </Text>

        {item.dataRegistro && (
          <Text style={styles.cardId}>
            Registrada em: {String(item.dataRegistro).replace('T', ' ')}
          </Text>
        )}

        {item.id != null && (
          <Text style={styles.cardId}>Registro #{item.id}</Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🦺</Text>
          <Text style={styles.titulo}>Segurança Industrial</Text>
          <Text style={styles.subtitulo}>
            Registro e acompanhamento de riscos
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Nova ocorrência</Text>
          <Text style={styles.rotulo}>Tipo de risco</Text>

          <View style={styles.opcoes}>
            {TIPOS_RISCO.map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.opcao,
                  tipo === opcao && styles.opcaoSelecionada,
                ]}
                onPress={() => setTipo(opcao)}
              >
                <Text
                  style={[
                    styles.textoOpcao,
                    tipo === opcao && styles.textoOpcaoSelecionada,
                  ]}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.rotulo}>Local</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Setor de produção"
            value={local}
            onChangeText={setLocal}
          />

          <Text style={styles.rotulo}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.inputDescricao]}
            placeholder="Descreva o risco identificado"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <TouchableOpacity
            style={[styles.botao, salvando && styles.botaoDesativado]}
            onPress={cadastrarOcorrencia}
            disabled={salvando}
          >
            <Text style={styles.textoBotao}>
              {salvando ? 'Salvando...' : 'Cadastrar ocorrência'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secao}>
          <View style={styles.linhaTitulo}>
            <Text style={styles.tituloSecao}>
              Ocorrências registradas
            </Text>

            <TouchableOpacity onPress={carregarOcorrencias}>
              <Text style={styles.atualizar}>Atualizar</Text>
            </TouchableOpacity>
          </View>

          {carregando ? (
            <ActivityIndicator size="large" color="#176B4D" />
          ) : erro ? (
            <Text style={styles.erro}>{erro}</Text>
          ) : ocorrencias.length === 0 ? (
            <Text style={styles.vazio}>
              Nenhuma ocorrência registrada ainda.
            </Text>
          ) : (
            <FlatList
              data={ocorrencias}
              keyExtractor={(item, index) => String(item.id ?? index)}
              renderItem={renderOcorrencia}
              scrollEnabled={false}
            />
          )}
        </View>

        <Text style={styles.rodape}>
          Sistema de apoio à segurança industrial
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F3',
  },
  conteudo: {
    paddingBottom: 32,
  },
  cabecalho: {
    backgroundColor: '#176B4D',
    padding: 28,
    paddingTop: 36,
  },
  icone: {
    fontSize: 36,
    marginBottom: 8,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#D9EEE5',
    fontSize: 14,
    marginTop: 6,
  },
  secao: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 0,
    padding: 18,
    borderRadius: 12,
  },
  tituloSecao: {
    color: '#18392D',
    fontSize: 19,
    fontWeight: 'bold',
  },
  rotulo: {
    color: '#34483E',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcao: {
    borderWidth: 1,
    borderColor: '#C9D8D0',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  opcaoSelecionada: {
    backgroundColor: '#176B4D',
    borderColor: '#176B4D',
  },
  textoOpcao: {
    color: '#34483E',
    fontSize: 13,
  },
  textoOpcaoSelecionada: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCD8D1',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },
  inputDescricao: {
    minHeight: 95,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#176B4D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoDesativado: {
    opacity: 0.6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  linhaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  atualizar: {
    color: '#176B4D',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F5F8F6',
    borderWidth: 1,
    borderColor: '#DCE6E0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  cardTipo: {
    color: '#176B4D',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTexto: {
    color: '#34483E',
    marginBottom: 5,
  },
  cardId: {
    color: '#718078',
    fontSize: 12,
    marginTop: 4,
  },
  vazio: {
    color: '#718078',
    paddingVertical: 12,
  },
  erro: {
    color: '#B42318',
    paddingVertical: 12,
  },
  rodape: {
    color: '#718078',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },
});
