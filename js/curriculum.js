/**
 * ClaveViva — Plano Completo do Curso (5 Módulos • 20 Aulas • 100% Prática)
 * Do zero até tocar o Minueto em Sol Maior (BWV Anh. 114 — Petzold / J.S. Bach).
 */
(function (global) {
  const COURSE_ROADMAP = [
    {
      moduleId: 1,
      title: "Módulo 1: Primeiras Notas na Clave de Sol & Pulso Básico",
      lessons: [
        { id: "1.1", title: "Aula 1.1 — Dó, Ré e Mi: O Ponto de Partida" },
        { id: "1.2", title: "Aula 1.2 — Fá, Sol e Figuras de Tempo (5 Dedos)" },
        { id: "1.3", title: "Aula 1.3 — Saltos e Pausas (O Silêncio na Pauta)" },
        { id: "1.4", title: "Aula 1.4 — Desafio: Ode à Alegria (Beethoven)" }
      ]
    },
    {
      moduleId: 2,
      title: "Módulo 2: Ritmo Real, Colcheias & Extensão Aguda",
      lessons: [
        { id: "2.1", title: "Aula 2.1 — Colcheias e Subdivisão (1-e-2-e)" },
        { id: "2.2", title: "Aula 2.2 — Mínima Pontuada e Compasso 3/4 (Valsa)" },
        { id: "2.3", title: "Aula 2.3 — Notas Agudas: Lá4, Si4 e Dó5" },
        { id: "2.4", title: "Aula 2.4 — Desafio: Greensleeves (3/4 com Colcheias)" }
      ]
    },
    {
      moduleId: 3,
      title: "Módulo 3: A Clave de Fá (Mão Esquerda & Baixos)",
      lessons: [
        { id: "3.1", title: "Aula 3.1 — Dominando a Clave de Fá (Fá3 a Dó4)" },
        { id: "3.2", title: "Aula 3.2 — Baixos Fundamentais: Dó3, Fá3 e Sol3" },
        { id: "3.3", title: "Aula 3.3 — Linha de Baixo Barroca (Cânone de Pachelbel)" },
        { id: "3.4", title: "Aula 3.4 — Desafio: Baixo Contínuo em Movimento" }
      ]
    },
    {
      moduleId: 4,
      title: "Módulo 4: Acidentes, Tonalidades & Repertório Clássico",
      lessons: [
        { id: "4.1", title: "Aula 4.1 — Sustenidos (♯) na Prática: Für Elise" },
        { id: "4.2", title: "Aula 4.2 — Bemóis (♭) na Prática: Fá Maior (Si♭)" },
        { id: "4.3", title: "Aula 4.3 — Tonalidade de Sol Maior (Fá♯ Constante)" },
        { id: "4.4", title: "Aula 4.4 — Desafio: Estudo Clássico em Sol Maior" }
      ]
    },
    {
      moduleId: 5,
      title: "Módulo 5: Fluência & A Peça Completa Final",
      lessons: [
        { id: "5.1", title: "Aula 5.1 — Leitura à Primeira Vista em Andamento Vivo" },
        { id: "5.2", title: "Aula 5.2 — Minueto em Sol Maior: Melodia (Seção A)" },
        { id: "5.3", title: "Aula 5.3 — Minueto em Sol Maior: Baixo (Clave de Fá)" },
        { id: "5.4", title: "Aula 5.4 — Recital Final: Minueto em Sol Maior (BWV Anh. 114)" }
      ]
    }
  ];

  const LESSON_ORDER = [
    "1.1", "1.2", "1.3", "1.4",
    "2.1", "2.2", "2.3", "2.4",
    "3.1", "3.2", "3.3", "3.4",
    "4.1", "4.2", "4.3", "4.4",
    "5.1", "5.2", "5.3", "5.4"
  ];

  const LESSONS = {
    // =========================================================================
    // MÓDULO 1
    // =========================================================================
    "1.1": {
      id: "1.1",
      module: "Módulo 1 • Aula 1.1",
      title: "Dó, Ré e Mi — O Ponto de Partida",
      goal: "Reconhecer visualmente e tocar imediatamente as 3 primeiras notas (Dó4, Ré4, Mi4) na Clave de Sol.",
      exercises: [
        {
          id: "1.1-ex1",
          title: "1. O Dó Central e o Vizinho Ré",
          subtitle: "Dó4 (linha suplementar) e Ré4 (abaixo da 1ª linha)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 65,
          tip: "O Dó4 tem um risquinho próprio. O Ré4 fica encostado logo abaixo da 1ª linha.",
          notes: [
            { pitch: "C4", dur: "h" }, { pitch: "D4", dur: "h" },
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" },
            { pitch: "C4", dur: "w" }
          ]
        },
        {
          id: "1.1-ex2",
          title: "2. Subindo até a 1ª Linha (Mi4)",
          subtitle: "Dó4 → Ré4 → Mi4 em graus conjuntos",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 68,
          tip: "O Mi4 mora exatamente em cima da 1ª linha (a linha de baixo).",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" },
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" }
          ]
        },
        {
          id: "1.1-ex3",
          title: "3. Saltos de 3ª: Dó ↔ Mi",
          subtitle: "Aprenda a pular o Ré de forma visual direta",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 70,
          tip: "Da linha suplementar (Dó4) direto para a 1ª linha (Mi4), pule uma tecla branca.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "h" }, { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.1-ex4",
          title: "4. Leitura Fluente: Mistura Rítmica",
          subtitle: "Combine semínimas (1t) e mínimas (2t)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 72,
          tip: "Tente ativar o modo Tempo Real e desativar as Dicas.",
          notes: [
            { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "h" }, { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "h" }, { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.1-ex5",
          title: "5. Desafio: Mary Had a Little Lamb",
          subtitle: "Melodia Tradicional (Domínio Público)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 76,
          tip: "Sua primeira música real! Observe as repetições de Mi e Ré.",
          notes: [
            { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" }
          ]
        }
      ]
    },

    "1.2": {
      id: "1.2",
      module: "Módulo 1 • Aula 1.2",
      title: "Fá, Sol e Figuras de Tempo (5 Dedos)",
      goal: "Dominar a diferença entre notas pretas (1 tempo) e brancas (2 ou 4 tempos) com os 5 dedos (Dó4 a Sol4).",
      exercises: [
        {
          id: "1.2-ex1",
          title: "1. Fá4 (1º Espaço) e Sol4 (2ª Linha)",
          subtitle: "Completando os 5 dedos: Dó4 a Sol4",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 76,
          tip: "O Fá4 mora no 1º espaço. O Sol4 mora na 2ª linha (onde a Clave de Sol nasce).",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" },
            { pitch: "G4", dur: "h" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "E4", dur: "h" }, { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.2-ex2",
          title: "2. Preta (1t) vs. Branca (2t) e Semibreve (4t)",
          subtitle: "Controle de sustentação no modo Tempo Real",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 75,
          tip: "Segure a tecla até a linha do tempo percorrer toda a faixa azul da nota aberta.",
          notes: [
            { pitch: "G4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "h" },
            { pitch: "G4", dur: "h" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" }
          ]
        },
        {
          id: "1.2-ex3",
          title: "3. Arpejos e Saltos (Dó–Mi–Sol)",
          subtitle: "Lendo saltos de 3ª e 5ª direto na pauta",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 78,
          tip: "Dó4 → Mi4 → Sol4: todas ficam em linhas!",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "G4", dur: "h" },
            { pitch: "G4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "F4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.2-ex4",
          title: "4. Au Clair de la Lune (Completa)",
          subtitle: "Tradicional Francesa (Domínio Público)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 80,
          tip: "Respeite os 2 tempos das mínimas no final de cada frase.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "h" }, { pitch: "D4", dur: "h" },
            { pitch: "C4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" },
            { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "G4", dur: "h" }, { pitch: "E4", dur: "h" },
            { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "h" }, { pitch: "D4", dur: "h" },
            { pitch: "C4", dur: "w" }
          ]
        },
        {
          id: "1.2-ex5",
          title: "5. Desafio: Jingle Bells (Refrão Completo)",
          subtitle: "James Lord Pierpont (Domínio Público)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 88,
          tip: "Tente completar sem Dicas para consolidar os 5 dedos!",
          notes: [
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "w" },
            { pitch: "F4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "F4", dur: "q" },
            { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "h" }, { pitch: "G4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" }
          ]
        }
      ]
    },

    "1.3": {
      id: "1.3",
      module: "Módulo 1 • Aula 1.3",
      title: "Saltos e Pausas (O Silêncio na Pauta)",
      goal: "Ler pausas de 1 tempo (𝄽) e 2 tempos (𝄼) mantendo o pulso sem perder o compasso.",
      exercises: [
        {
          id: "1.3-ex1",
          title: "1. Respirando no Compasso (Pausa de 1 tempo)",
          subtitle: "Quando a linha cruzar uma pausa (𝄽), NÃO toque!",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 76,
          tip: "A pausa de semínima (𝄽) vale 1 tempo de silêncio. Conte junto e entre firme na nota seguinte.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "REST", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "REST", dur: "q" },
            { pitch: "G4", dur: "q" }, { pitch: "REST", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "REST", dur: "q" },
            { pitch: "F4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.3-ex2",
          title: "2. Saltos de 4ª e 5ª + Pausas de 2 Tempos",
          subtitle: "Saltando de Dó4 para Fá4/Sol4 com silêncio controlado",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 78,
          tip: "O retângulo sobre a 3ª linha (𝄼) é a pausa de mínima: 2 tempos inteiros de silêncio.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "REST", dur: "h" },
            { pitch: "D4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "REST", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" }
          ]
        },
        {
          id: "1.3-ex3",
          title: "3. Desafio: Frère Jacques (Cânone Tradicional)",
          subtitle: "Melodia em 5 dedos com salto característico",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 84,
          tip: "No compasso 3, observe o salto Mi4 → Fá4 → Sol4 (2 tempos).",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "C4", dur: "q" },
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "h" },
            { pitch: "C4", dur: "q" }, { pitch: "REST", dur: "q" }, { pitch: "C4", dur: "h" }
          ]
        }
      ]
    },

    "1.4": {
      id: "1.4",
      module: "Módulo 1 • Aula 1.4",
      title: "Desafio do Módulo 1: Ode à Alegria (Beethoven)",
      goal: "Tocar a melodia completa da 9ª Sinfonia de Beethoven lendo os 5 dedos sem dicas.",
      exercises: [
        {
          id: "1.4-ex1",
          title: "1. Ode à Alegria — Seção A (Preparação)",
          subtitle: "Ludwig van Beethoven (Domínio Público)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 82,
          tip: "Comece no Mi4 (1ª linha). Desative 'Dicas' para testar sua leitura real!",
          notes: [
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "G4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" }, { pitch: "D4", dur: "h" }
          ]
        },
        {
          id: "1.4-ex2",
          title: "2. Ode à Alegria — Tema Completo (16 Compassos)",
          subtitle: "Ludwig van Beethoven — Peça de Conclusão do Módulo 1",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 88,
          tip: "Na segunda metade, atenção à ponte Ré-Ré-Mi-Dó e ao salto para o Sol4.",
          notes: [
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "G4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" }, { pitch: "D4", dur: "h" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "G4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "h" }, { pitch: "C4", dur: "h" }
          ]
        }
      ]
    },

    // =========================================================================
    // MÓDULO 2
    // =========================================================================
    "2.1": {
      id: "2.1",
      module: "Módulo 2 • Aula 2.1",
      title: "Colcheias e Subdivisão (1-e-2-e)",
      goal: "Ler e tocar pares de colcheias (meio tempo cada) em equilíbrio com semínimas.",
      exercises: [
        {
          id: "2.1-ex1",
          title: "1. Sentindo a Subdivisão em Colcheias",
          subtitle: "Notas com bandeirola valem metade de uma semínima (2 por batida)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 72,
          tip: "Conte '1 - e - 2 - e': toque duas colcheias no espaço de uma única batida do metrônomo.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "8" }, { pitch: "E4", dur: "8" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "G4", dur: "8" }, { pitch: "F4", dur: "8" }, { pitch: "E4", dur: "8" }, { pitch: "D4", dur: "8" }, { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "2.1-ex2",
          title: "2. Frère Jacques com Colcheias Originais",
          subtitle: "Ritmo autêntico do cânone tradicional",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 78,
          tip: "No compasso 5 ('Sonnez les matines'), as colcheias sobem até Sol4 e descem rápido.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "h" },
            { pitch: "G4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "G4", dur: "8" }, { pitch: "F4", dur: "8" }, { pitch: "E4", dur: "q" }, { pitch: "C4", dur: "q" },
            { pitch: "C4", dur: "q" }, { pitch: "G3", dur: "q" }, { pitch: "C4", dur: "h" }
          ]
        }
      ]
    },

    "2.2": {
      id: "2.2",
      module: "Módulo 2 • Aula 2.2",
      title: "Mínima Pontuada e Compasso 3/4 (Valsa)",
      goal: "Sentir o pulso ternário (1-2-3) e sustentar mínimas pontuadas por 3 tempos inteiros.",
      exercises: [
        {
          id: "2.2-ex1",
          title: "1. Pulso de Valsa (3/4) e Mínima Pontuada",
          subtitle: "A bolinha branca com ponto ao lado vale 3 tempos",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 80,
          tip: "Em 3/4 cada compasso tem 3 batidas: forte-fraco-fraco (1-2-3).",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "E4", dur: "h." },
            { pitch: "F4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "C4", dur: "h." }
          ]
        },
        {
          id: "2.2-ex2",
          title: "2. Valsa dos 5 Dedos",
          subtitle: "Fraseado ternário fluido com saltos",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 86,
          tip: "Segure as mínimas pontuadas durante todo o compasso antes de atacar o próximo.",
          notes: [
            { pitch: "G4", dur: "h" }, { pitch: "E4", dur: "q" },
            { pitch: "F4", dur: "h" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "G4", dur: "h." },
            { pitch: "E4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "h." }
          ]
        }
      ]
    },

    "2.3": {
      id: "2.3",
      module: "Módulo 2 • Aula 2.3",
      title: "Notas Agudas: Lá4, Si4 e Dó5",
      goal: "Expandir a leitura na Clave de Sol do 2º espaço (Lá4) até o 3º espaço (Dó5).",
      exercises: [
        {
          id: "2.3-ex1",
          title: "1. Subindo ao Dó5 (3º Espaço)",
          subtitle: "Lá4 (2º espaço), Si4 (3ª linha) e Dó5 (3º espaço)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 76,
          tip: "Use a linha âncora Sol4 (2ª linha): um passo acima é Lá4; na 3ª linha (meio da pauta) é Si4; no 3º espaço é Dó5.",
          notes: [
            { pitch: "G4", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "B4", dur: "q" }, { pitch: "C5", dur: "q" },
            { pitch: "C5", dur: "h" }, { pitch: "B4", dur: "q" }, { pitch: "A4", dur: "q" },
            { pitch: "G4", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "B4", dur: "q" }, { pitch: "C5", dur: "q" },
            { pitch: "G4", dur: "w" }
          ]
        },
        {
          id: "2.3-ex2",
          title: "2. Brilha, Brilha Estrelinha (Completa)",
          subtitle: "W.A. Mozart / Tradicional — Agora com Lá4!",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 84,
          tip: "Salto clássico de 5ª no início: Dó4 → Sol4 → Lá4 → Sol4.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "A4", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "G4", dur: "h" },
            { pitch: "F4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" },
            { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "F4", dur: "q" },
            { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "D4", dur: "h" },
            { pitch: "C4", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "A4", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "G4", dur: "h" },
            { pitch: "F4", dur: "q" }, { pitch: "F4", dur: "q" }, { pitch: "E4", dur: "q" }, { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" }, { pitch: "D4", dur: "q" }, { pitch: "C4", dur: "h" }
          ]
        }
      ]
    },

    "2.4": {
      id: "2.4",
      module: "Módulo 2 • Aula 2.4",
      title: "Desafio do Módulo 2: Greensleeves (3/4)",
      goal: "Tocar melodia renascentista em 3/4 unindo notas agudas, mínimas pontuadas e colcheias.",
      exercises: [
        {
          id: "2.4-ex1",
          title: "1. Greensleeves (Tema Renascentista)",
          subtitle: "Tradicional Inglesa (Domínio Público) — Em Lá Menor natural",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 80,
          tip: "Observe a região aguda (Dó5, Ré5, Mi5) e mantenha o balanço de valsa.",
          notes: [
            { pitch: "A4", dur: "q" }, { pitch: "C5", dur: "h" },
            { pitch: "D5", dur: "q" }, { pitch: "E5", dur: "q" }, { pitch: "D5", dur: "q" },
            { pitch: "C5", dur: "h" }, { pitch: "A4", dur: "q" },
            { pitch: "G4", dur: "h" }, { pitch: "A4", dur: "q" },
            { pitch: "B4", dur: "q" }, { pitch: "C5", dur: "q" }, { pitch: "A4", dur: "q" },
            { pitch: "A4", dur: "h." }
          ]
        }
      ]
    },

    // =========================================================================
    // MÓDULO 3 — CLAVE DE FÁ (MÃO ESQUERDA)
    // =========================================================================
    "3.1": {
      id: "3.1",
      module: "Módulo 3 • Aula 3.1",
      title: "Dominando a Clave de Fá (Fá3 a Dó4)",
      goal: "Ler na Clave de Fá (𝄢) usando a 4ª linha (Fá3) e a linha suplementar superior (Dó4) como âncoras.",
      exercises: [
        {
          id: "3.1-ex1",
          title: "1. Âncora Fá3 (4ª Linha) e Dó4",
          subtitle: "Os dois pontos da Clave de Fá abraçam exatamente a 4ª linha: Fá3!",
          clef: "bass",
          timeSignature: "4/4",
          defaultBpm: 72,
          tip: "Use a região grave do teclado (teclas Z-M ou mão esquerda no piano). Fá3 fica na 4ª linha.",
          notes: [
            { pitch: "F3", dur: "h" }, { pitch: "G3", dur: "h" },
            { pitch: "A3", dur: "q" }, { pitch: "B3", dur: "q" }, { pitch: "C4", dur: "h" },
            { pitch: "B3", dur: "q" }, { pitch: "A3", dur: "q" }, { pitch: "G3", dur: "q" }, { pitch: "F3", dur: "q" },
            { pitch: "F3", dur: "w" }
          ]
        },
        {
          id: "3.1-ex2",
          title: "2. Movimento de Baixo (Fá3–Dó4)",
          subtitle: "Leitura fluente com a mão esquerda",
          clef: "bass",
          timeSignature: "4/4",
          defaultBpm: 76,
          tip: "Dó4 na Clave de Fá fica na primeira linha suplementar ACIMA da pauta.",
          notes: [
            { pitch: "C4", dur: "q" }, { pitch: "B3", dur: "q" }, { pitch: "A3", dur: "q" }, { pitch: "G3", dur: "q" },
            { pitch: "F3", dur: "h" }, { pitch: "G3", dur: "h" },
            { pitch: "A3", dur: "q" }, { pitch: "C4", dur: "q" }, { pitch: "G3", dur: "q" }, { pitch: "F3", dur: "q" },
            { pitch: "C4", dur: "w" }
          ]
        }
      ]
    },

    "3.2": {
      id: "3.2",
      module: "Módulo 3 • Aula 3.2",
      title: "Baixos Fundamentais: Dó3, Fá3 e Sol3",
      goal: "Ler as notas graves mais comuns de acompanhamento (Dó3 no 2º espaço, Sol3 no 4º espaço).",
      exercises: [
        {
          id: "3.2-ex1",
          title: "1. Conhecendo o Dó3 (2º Espaço)",
          subtitle: "A base de quase todas as músicas em Dó Maior",
          clef: "bass",
          timeSignature: "4/4",
          defaultBpm: 74,
          tip: "Dó3 mora no 2º espaço (de baixo para cima). Salte de Dó3 para Sol3 (4º espaço).",
          notes: [
            { pitch: "C3", dur: "h" }, { pitch: "G3", dur: "h" },
            { pitch: "F3", dur: "h" }, { pitch: "C3", dur: "h" },
            { pitch: "C3", dur: "q" }, { pitch: "E3", dur: "q" }, { pitch: "G3", dur: "q" }, { pitch: "E3", dur: "q" },
            { pitch: "C3", dur: "w" }
          ]
        }
      ]
    },

    "3.3": {
      id: "3.3",
      module: "Módulo 3 • Aula 3.3",
      title: "Linha de Baixo Barroca (Cânone de Pachelbel)",
      goal: "Tocar a famosa sequência de baixos do Cânone em Dó (adaptado) com pulso firme na Clave de Fá.",
      exercises: [
        {
          id: "3.3-ex1",
          title: "1. Baixo do Cânone (Dó–Sol–Lá–Mi–Fá–Dó–Fá–Sol)",
          subtitle: "Johann Pachelbel (Domínio Público — Transposto para Dó Maior)",
          clef: "bass",
          timeSignature: "4/4",
          defaultBpm: 78,
          tip: "Sinta a progressão harmônica clássica enquanto lê cada nota grave na Clave de Fá.",
          notes: [
            { pitch: "C3", dur: "h" }, { pitch: "G3", dur: "h" },
            { pitch: "A3", dur: "h" }, { pitch: "E3", dur: "h" },
            { pitch: "F3", dur: "h" }, { pitch: "C3", dur: "h" },
            { pitch: "F3", dur: "h" }, { pitch: "G3", dur: "h" },
            { pitch: "C3", dur: "w" }
          ]
        }
      ]
    },

    "3.4": {
      id: "3.4",
      module: "Módulo 3 • Aula 3.4",
      title: "Desafio do Módulo 3: Baixo Contínuo em Movimento",
      goal: "Executar baixos barrocos em semínimas e colcheias na Clave de Fá sem olhar para as mãos.",
      exercises: [
        {
          id: "3.4-ex1",
          title: "1. Baixo Caminhante (Walking Bass Clássico)",
          subtitle: "Preparação direta para o Minueto em Sol Maior",
          clef: "bass",
          timeSignature: "3/4",
          defaultBpm: 80,
          tip: "Em 3/4, sinta o peso no 1º tempo de cada compasso.",
          notes: [
            { pitch: "G3", dur: "h" }, { pitch: "F3", dur: "q" },
            { pitch: "E3", dur: "h" }, { pitch: "D3", dur: "q" },
            { pitch: "C3", dur: "q" }, { pitch: "D3", dur: "q" }, { pitch: "E3", dur: "q" },
            { pitch: "D3", dur: "h." },
            { pitch: "G3", dur: "h." }
          ]
        }
      ]
    },

    // =========================================================================
    // MÓDULO 4 — ACIDENTES & TONALIDADES
    // =========================================================================
    "4.1": {
      id: "4.1",
      module: "Módulo 4 • Aula 4.1",
      title: "Sustenidos (♯) na Prática: Für Elise",
      goal: "Reconhecer o símbolo ♯ (meio-tom acima / tecla preta à direita) tocando o tema de Für Elise.",
      exercises: [
        {
          id: "4.1-ex1",
          title: "1. Tema de Für Elise (Frase Inicial)",
          subtitle: "Ludwig van Beethoven (Domínio Público) — Introduzindo Ré♯5",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 76,
          tip: "Sempre que vir ♯ antes da nota, toque a tecla preta imediatamente à direita dela!",
          notes: [
            { pitch: "E5", dur: "8" }, { pitch: "D#5", dur: "8" }, { pitch: "E5", dur: "8" }, { pitch: "D#5", dur: "8" }, { pitch: "E5", dur: "8" }, { pitch: "B4", dur: "8" },
            { pitch: "D5", dur: "8" }, { pitch: "C5", dur: "8" }, { pitch: "A4", dur: "h" },
            { pitch: "C4", dur: "8" }, { pitch: "E4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "B4", dur: "q." },
            { pitch: "E4", dur: "8" }, { pitch: "G#4", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "C5", dur: "h" }
          ]
        }
      ]
    },

    "4.2": {
      id: "4.2",
      module: "Módulo 4 • Aula 4.2",
      title: "Bemóis (♭) na Prática: Fá Maior (Si♭)",
      goal: "Reconhecer o símbolo ♭ (meio-tom abaixo / tecla preta à esquerda) em melodias em Fá Maior.",
      exercises: [
        {
          id: "4.2-ex1",
          title: "1. Escala e Melodia com Si♭4",
          subtitle: "O Si♭4 fica na tecla preta logo à esquerda do Si4",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 78,
          tip: "Fá → Sol → Lá → Si♭ → Dó: sinta a sonoridade doce da escala de Fá Maior.",
          notes: [
            { pitch: "F4", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "Bb4", dur: "q" },
            { pitch: "C5", dur: "h" }, { pitch: "Bb4", dur: "q" }, { pitch: "A4", dur: "q" },
            { pitch: "G4", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "Bb4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "F4", dur: "w" }
          ]
        }
      ]
    },

    "4.3": {
      id: "4.3",
      module: "Módulo 4 • Aula 4.3",
      title: "Tonalidade de Sol Maior (Fá♯ Constante)",
      goal: "Preparar o ouvido e os dedos para a peça final (Minueto em Sol Maior) usando Fá♯4 e Fá♯5.",
      exercises: [
        {
          id: "4.3-ex1",
          title: "1. Escala e Arpejo de Sol Maior",
          subtitle: "Todo Fá agora vira Fá♯!",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 80,
          tip: "Atenção ao Fá♯4 (1º espaço) e ao Fá♯5 (5ª linha).",
          notes: [
            { pitch: "G4", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "B4", dur: "q" }, { pitch: "C5", dur: "q" },
            { pitch: "D5", dur: "q" }, { pitch: "E5", dur: "q" }, { pitch: "F#5", dur: "q" }, { pitch: "G5", dur: "q" },
            { pitch: "G5", dur: "q" }, { pitch: "D5", dur: "q" }, { pitch: "B4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "F#4", dur: "q" }, { pitch: "G4", dur: "h." }
          ]
        }
      ]
    },

    "4.4": {
      id: "4.4",
      module: "Módulo 4 • Aula 4.4",
      title: "Desafio do Módulo 4: Estudo em Sol Maior",
      goal: "Consolidar leitura rápida de colcheias e Fá♯ em compasso 3/4.",
      exercises: [
        {
          id: "4.4-ex1",
          title: "1. Estudo Clássico em Sol Maior (3/4)",
          subtitle: "Preparatório para o Minueto BWV Anh. 114",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 84,
          tip: "Mantenha a fluência nas colcheias descendentes.",
          notes: [
            { pitch: "D5", dur: "q" }, { pitch: "G4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "C5", dur: "8" },
            { pitch: "D5", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "E5", dur: "q" }, { pitch: "C5", dur: "8" }, { pitch: "D5", dur: "8" }, { pitch: "E5", dur: "8" }, { pitch: "F#5", dur: "8" },
            { pitch: "G5", dur: "h." }
          ]
        }
      ]
    },

    // =========================================================================
    // MÓDULO 5 — A PEÇA COMPLETA FINAL
    // =========================================================================
    "5.1": {
      id: "5.1",
      module: "Módulo 5 • Aula 5.1",
      title: "Leitura à Primeira Vista em Andamento Vivo",
      goal: "Ler sequências inéditas com saltos e colcheias a 95+ BPM sem pausar.",
      exercises: [
        {
          id: "5.1-ex1",
          title: "1. Desafio de Fluência Barroca",
          subtitle: "Leitura contínua em Sol Maior",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 94,
          tip: "Olhe sempre 1 nota à frente da linha do tempo!",
          notes: [
            { pitch: "B4", dur: "q" }, { pitch: "C5", dur: "8" }, { pitch: "D5", dur: "8" }, { pitch: "B4", dur: "q" },
            { pitch: "A4", dur: "q" }, { pitch: "B4", dur: "8" }, { pitch: "C5", dur: "8" }, { pitch: "A4", dur: "q" },
            { pitch: "G4", dur: "q" }, { pitch: "A4", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "G4", dur: "q" },
            { pitch: "F#4", dur: "h." }
          ]
        }
      ]
    },

    "5.2": {
      id: "5.2",
      module: "Módulo 5 • Aula 5.2",
      title: "Minueto em Sol Maior: Melodia (Seção A)",
      goal: "Dominar os primeiros 16 compassos da mão direita do Minueto em Sol Maior (BWV Anh. 114).",
      exercises: [
        {
          id: "5.2-ex1",
          title: "1. Minueto em Sol Maior — Seção A (Mão Direita)",
          subtitle: "Christian Petzold / J.S. Bach (BWV Anh. 114)",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 88,
          tip: "Atenção às colcheias ligadas em escala e ao Fá♯4 nos compassos finais da seção.",
          notes: [
            { pitch: "D5", dur: "q" }, { pitch: "G4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "C5", dur: "8" },
            { pitch: "D5", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "E5", dur: "q" }, { pitch: "C5", dur: "8" }, { pitch: "D5", dur: "8" }, { pitch: "E5", dur: "8" }, { pitch: "F#5", dur: "8" },
            { pitch: "G5", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "C5", dur: "q" }, { pitch: "D5", dur: "8" }, { pitch: "C5", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "A4", dur: "8" },
            { pitch: "B4", dur: "q" }, { pitch: "C5", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "G4", dur: "8" },
            { pitch: "F#4", dur: "q" }, { pitch: "G4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "G4", dur: "8" },
            { pitch: "A4", dur: "h." }
          ]
        }
      ]
    },

    "5.3": {
      id: "5.3",
      module: "Módulo 5 • Aula 5.3",
      title: "Minueto em Sol Maior: Baixo (Clave de Fá)",
      goal: "Ler e tocar o acompanhamento da mão esquerda do Minueto em Sol Maior na Clave de Fá.",
      exercises: [
        {
          id: "5.3-ex1",
          title: "1. Minueto em Sol Maior — Baixo da Seção A (Clave de Fá)",
          subtitle: "Christian Petzold / J.S. Bach — Mão Esquerda",
          clef: "bass",
          timeSignature: "3/4",
          defaultBpm: 88,
          tip: "Use o registro grave do piano. Observe os saltos de oitava e o Fá♯3.",
          notes: [
            { pitch: "G3", dur: "h" }, { pitch: "A3", dur: "q" },
            { pitch: "B3", dur: "h." },
            { pitch: "C4", dur: "h." },
            { pitch: "B3", dur: "h." },
            { pitch: "A3", dur: "h." },
            { pitch: "G3", dur: "h." },
            { pitch: "D3", dur: "q" }, { pitch: "B3", dur: "q" }, { pitch: "G3", dur: "q" },
            { pitch: "D3", dur: "h." }
          ]
        }
      ]
    },

    "5.4": {
      id: "5.4",
      module: "Módulo 5 • Aula 5.4",
      title: "Recital Final: Minueto em Sol Maior (BWV Anh. 114)",
      goal: "Tocar a peça completa (Seção A + Seção B) lendo partitura real do início ao fim!",
      exercises: [
        {
          id: "5.4-ex1",
          title: "Peça Final: Minueto em Sol Maior (Seção A + Seção B Completa)",
          subtitle: "Christian Petzold / J.S. Bach (BWV Anh. 114 — Domínio Público)",
          clef: "treble",
          timeSignature: "3/4",
          defaultBpm: 92,
          tip: "Parabéns por chegar até aqui! Desative as Dicas e as Linhas Guia para tocar como um concertista.",
          notes: [
            // Seção A
            { pitch: "D5", dur: "q" }, { pitch: "G4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "C5", dur: "8" },
            { pitch: "D5", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "E5", dur: "q" }, { pitch: "C5", dur: "8" }, { pitch: "D5", dur: "8" }, { pitch: "E5", dur: "8" }, { pitch: "F#5", dur: "8" },
            { pitch: "G5", dur: "q" }, { pitch: "G4", dur: "q" }, { pitch: "G4", dur: "q" },
            { pitch: "C5", dur: "q" }, { pitch: "D5", dur: "8" }, { pitch: "C5", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "A4", dur: "8" },
            { pitch: "B4", dur: "q" }, { pitch: "C5", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "G4", dur: "8" },
            { pitch: "A4", dur: "q" }, { pitch: "B4", dur: "8" }, { pitch: "A4", dur: "8" }, { pitch: "G4", dur: "8" }, { pitch: "F#4", dur: "8" },
            { pitch: "G4", dur: "h." },
            // Seção B
            { pitch: "B5", dur: "q" }, { pitch: "G5", dur: "8" }, { pitch: "A5", dur: "8" }, { pitch: "B5", dur: "8" }, { pitch: "G5", dur: "8" },
            { pitch: "A5", dur: "q" }, { pitch: "D5", dur: "8" }, { pitch: "E5", dur: "8" }, { pitch: "F#5", dur: "8" }, { pitch: "D5", dur: "8" },
            { pitch: "G5", dur: "q" }, { pitch: "E5", dur: "8" }, { pitch: "F#5", dur: "8" }, { pitch: "G5", dur: "8" }, { pitch: "D5", dur: "8" },
            { pitch: "C#5", dur: "q" }, { pitch: "B4", dur: "8" }, { pitch: "C#5", dur: "8" }, { pitch: "A4", dur: "q" },
            { pitch: "A4", dur: "8" }, { pitch: "B4", dur: "8" }, { pitch: "C#5", dur: "8" }, { pitch: "D5", dur: "8" }, { pitch: "E5", dur: "8" }, { pitch: "F#5", dur: "8" },
            { pitch: "G5", dur: "q" }, { pitch: "F#5", dur: "q" }, { pitch: "E5", dur: "q" },
            { pitch: "F#5", dur: "q" }, { pitch: "A4", dur: "q" }, { pitch: "C#5", dur: "q" },
            { pitch: "D5", dur: "h." }
          ]
        }
      ]
    }
  };

  const RHYTHM_GUIDE = [
    {
      id: "quarter",
      name: "Semínima (1 tempo)",
      desc: "Bolinha preta com haste: vale 1 batida do metrônomo.",
      beats: 1,
      svg: `<svg width="30" height="38" viewBox="0 0 30 38"><ellipse cx="12" cy="28" rx="6" ry="4.4" transform="rotate(-18 12 28)" fill="#111113"/><line x1="17.5" y1="28" x2="17.5" y2="6" stroke="#111113" stroke-width="1.8"/></svg>`
    },
    {
      id: "half",
      name: "Mínima (2 tempos)",
      desc: "Bolinha branca com haste: toque e segure por 2 batidas.",
      beats: 2,
      svg: `<svg width="30" height="38" viewBox="0 0 30 38"><ellipse cx="12" cy="28" rx="6" ry="4.4" transform="rotate(-18 12 28)" fill="#faf9f5" stroke="#111113" stroke-width="2"/><line x1="17.5" y1="28" x2="17.5" y2="6" stroke="#111113" stroke-width="1.8"/></svg>`
    },
    {
      id: "whole",
      name: "Semibreve (4 tempos)",
      desc: "Bolinha branca sem haste: segure por 4 batidas (compasso inteiro).",
      beats: 4,
      svg: `<svg width="30" height="38" viewBox="0 0 30 38"><ellipse cx="15" cy="22" rx="7" ry="4.8" transform="rotate(-12 15 22)" fill="#faf9f5" stroke="#111113" stroke-width="2.2"/></svg>`
    }
  ];

  global.ClaveCurriculum = {
    ROADMAP: COURSE_ROADMAP,
    LESSON_ORDER,
    LESSONS,
    RHYTHM_GUIDE
  };
})(window);
