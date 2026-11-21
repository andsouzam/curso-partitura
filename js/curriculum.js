/**
 * ClaveViva — Plano Completo do Curso & Conteúdo Prático (Aula a Aula)
 * Regra de Ouro: 100% Prática. Nenhuma parede de teoria — aprenda tocando na pauta.
 */
(function (global) {
  const COURSE_ROADMAP = [
    {
      moduleId: 1,
      title: "Módulo 1: Primeiras Notas na Clave de Sol & Pulso Básico",
      status: "available",
      lessons: [
        { id: "1.1", title: "Aula 1.1 — Dó, Ré e Mi: O Ponto de Partida", status: "available" },
        { id: "1.2", title: "Aula 1.2 — Fá, Sol e Figuras de Tempo (5 Dedos)", status: "available" },
        { id: "1.3", title: "Aula 1.3 — Saltos e Pausas (O Silêncio na Pauta)", status: "upcoming" },
        { id: "1.4", title: "Aula 1.4 — Desafio: Ode à Alegria (Beethoven)", status: "upcoming" }
      ]
    },
    {
      moduleId: 2,
      title: "Módulo 2: Ritmo Real, Colcheias & Extensão Aguda",
      status: "upcoming",
      lessons: [
        { id: "2.1", title: "Aula 2.1 — Colcheias e Subdivisão (1-e-2-e)", status: "upcoming" },
        { id: "2.2", title: "Aula 2.2 — Mínima Pontuada e Compasso 3/4 (Valsa)", status: "upcoming" },
        { id: "2.3", title: "Aula 2.3 — Notas Agudas: Lá4, Si4 e Dó5", status: "upcoming" },
        { id: "2.4", title: "Aula 2.4 — Desafio: Melodia Completa em 3/4", status: "upcoming" }
      ]
    },
    {
      moduleId: 3,
      title: "Módulo 3: A Clave de Fá & O Grande Sistema (Mão Esquerda)",
      status: "upcoming",
      lessons: [
        { id: "3.1", title: "Aula 3.1 — Dominando a Clave de Fá (Fá3 a Dó4)", status: "upcoming" },
        { id: "3.2", title: "Aula 3.2 — Baixos Fundamentais: Dó3, Fá3 e Sol3", status: "upcoming" },
        { id: "3.3", title: "Aula 3.3 — Leitura no Grande Sistema: Alternando Mãos", status: "upcoming" },
        { id: "3.4", title: "Aula 3.4 — Desafio: Duas Mãos em Diálogo", status: "upcoming" }
      ]
    },
    {
      moduleId: 4,
      title: "Módulo 4: Acidentes, Armaduras de Clave & Acordes",
      status: "upcoming",
      lessons: [
        { id: "4.1", title: "Aula 4.1 — Sustenidos (#) e Bemóis (b) na Prática", status: "upcoming" },
        { id: "4.2", title: "Aula 4.2 — Armaduras: Sol Maior (Fá#) e Fá Maior (Sib)", status: "upcoming" },
        { id: "4.3", title: "Aula 4.3 — Leitura Vertical: Intervalos e Tríades", status: "upcoming" },
        { id: "4.4", title: "Aula 4.4 — Desafio: Melodia + Acordes (Canon / Für Elise)", status: "upcoming" }
      ]
    },
    {
      moduleId: 5,
      title: "Módulo 5: Expressão, Fluência & A Peça Completa Final",
      status: "upcoming",
      lessons: [
        { id: "5.1", title: "Aula 5.1 — Ligaduras, Staccato e Dinâmica (p, mf, f)", status: "upcoming" },
        { id: "5.2", title: "Aula 5.2 — Leitura à Primeira Vista em Tempo Real", status: "upcoming" },
        { id: "5.3", title: "Aula 5.3 — Preparação: Minueto em Sol Maior (Seções A e B)", status: "upcoming" },
        { id: "5.4", title: "Aula 5.4 — Recital Final: Minueto em Sol Maior (BWV Anh. 114)", status: "upcoming" }
      ]
    }
  ];

  const LESSONS = {
    "1.1": {
      id: "1.1",
      module: "Módulo 1 • Aula 1.1",
      title: "Dó, Ré e Mi — O Ponto de Partida",
      goal: "Reconhecer visualmente e tocar imediatamente as 3 primeiras notas (Dó4, Ré4, Mi4) na Clave de Sol, sentindo o pulso de semínimas e mínimas.",
      exercises: [
        {
          id: "1.1-ex1",
          title: "1. O Dó Central e o Vizinho Ré",
          subtitle: "Dó4 (linha cortada abaixo da pauta) e Ré4 (espaço logo abaixo da 1ª linha)",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 65,
          tip: "Olhe para o formato: o Dó4 tem um 'risquinho' próprio (linha suplementar). O Ré4 fica encostado logo abaixo da primeira linha da pauta. Toque sem olhar para as mãos!",
          notes: [
            { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "h" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "h" },
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
          tip: "O Mi4 mora exatamente em cima da 1ª linha (a linha de baixo). Sinta o movimento de escada: linha suplementar (Dó) → abaixo da linha (Ré) → na 1ª linha (Mi).",
          notes: [
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "h" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
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
          tip: "Quando você vê uma nota na linha suplementar (Dó) indo direto para a 1ª linha (Mi), você pula uma tecla branca (o Ré) no teclado!",
          notes: [
            { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "h" },
            { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.1-ex4",
          title: "4. Leitura Fluente: Mistura Rítmica",
          subtitle: "Combine semínimas (1 tempo) e mínimas (2 tempos) sem hesitar",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 72,
          tip: "Tente ativar o modo 'Tempo Real' aqui! Desative 'Mostrar Dicas' quando se sentir seguro para testar sua leitura pura.",
          notes: [
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.1-ex5",
          title: "5. Desafio: Mary Had a Little Lamb",
          subtitle: "Melodia Tradicional (Domínio Público) — Apenas com Dó, Ré e Mi!",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 76,
          tip: "Sua primeira música real! Nos dois primeiros compassos, note a repetição de Mi e Ré. No compasso 3, observe o salto Dó → Mi → Mi.",
          notes: [
            // Compasso 1
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            // Compasso 2
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" },
            // Compasso 3
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "h" },
            // Compasso 4 (simplificada C-E-E para manter 100% nas 3 notas da Aula 1.1)
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" },
            // Compasso 5
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            // Compasso 6
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            // Compasso 7
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            // Compasso 8
            { pitch: "C4", dur: "w" }
          ]
        }
      ]
    },
    "1.2": {
      id: "1.2",
      module: "Módulo 1 • Aula 1.2",
      title: "Fá, Sol e Figuras de Tempo (5 Dedos)",
      goal: "Dominar a diferença entre notas pretas (1 tempo) e brancas (2 ou 4 tempos), lendo e tocando músicas reais com os 5 dedos (Dó4 a Sol4).",
      exercises: [
        {
          id: "1.2-ex1",
          title: "1. Fá4 (1º Espaço) e Sol4 (2ª Linha)",
          subtitle: "Completando os 5 dedos: Dó4, Ré4, Mi4, Fá4 e Sol4 em movimento",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 76,
          tip: "O Fá4 mora no 1º espaço (entre a 1ª e a 2ª linha). O Sol4 mora exatamente na 2ª linha (onde a Clave de Sol se enrola!).",
          notes: [
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "G4", dur: "h" },
            { pitch: "F4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "G4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.2-ex2",
          title: "2. Preta (1t) vs. Branca (2t) e Semibreve (4t)",
          subtitle: "Treine o controle exato de duração no modo Tempo Real",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 75,
          tip: "Ative o modo 'Tempo Real'! Bolinha preta = toque e avance a cada batida. Bolinha branca com haste = segure por 2 batidas. Sem haste = segure 4 batidas.",
          notes: [
            { pitch: "G4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "F4", dur: "h" },
            { pitch: "G4", dur: "h" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
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
          tip: "Repare no padrão visual: Dó4 (linha suplementar) → Mi4 (1ª linha) → Sol4 (2ª linha). Todas ficam em linhas! Você pula uma tecla entre cada uma.",
          notes: [
            { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "G4", dur: "h" },
            { pitch: "G4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "C4", dur: "h" },
            { pitch: "D4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "G4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "h" }
          ]
        },
        {
          id: "1.2-ex4",
          title: "4. Au Clair de la Lune (Completa)",
          subtitle: "Tradicional Francesa (Domínio Público) — 16 compassos em Dó Maior",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 80,
          tip: "Atenção às notas brancas (mínimas) no final de cada frase: segure-as por 2 tempos completos antes de iniciar a frase seguinte.",
          notes: [
            // Frase 1
            { pitch: "C4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "D4", dur: "h" },
            // Frase 2
            { pitch: "C4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" },
            // Frase 3 (variação em 5 dedos)
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "G4", dur: "h" },
            { pitch: "E4", dur: "h" },
            // Frase 4
            { pitch: "C4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "D4", dur: "h" },
            { pitch: "C4", dur: "w" }
          ]
        },
        {
          id: "1.2-ex5",
          title: "5. Desafio: Jingle Bells (Refrão Completo)",
          subtitle: "James Lord Pierpont (1857, Domínio Público) — 5 Dedos + Ritmo Real",
          clef: "treble",
          timeSignature: "4/4",
          defaultBpm: 88,
          tip: "Combine velocidade nas semínimas (pretas) com controle nas mínimas (brancas de 2t) e semibreve final (4t). Tente sem dicas!",
          notes: [
            // Jingle bells, jingle bells, jingle all the way
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" },
            { pitch: "G4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "w" },
            // Oh what fun it is to ride...
            { pitch: "F4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "F4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "D4", dur: "h" },
            { pitch: "G4", dur: "h" },
            // Final resolution
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "q" },
            { pitch: "E4", dur: "h" },
            { pitch: "E4", dur: "q" },
            { pitch: "G4", dur: "q" },
            { pitch: "C4", dur: "q" },
            { pitch: "D4", dur: "q" },
            { pitch: "C4", dur: "w" }
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
    LESSONS,
    RHYTHM_GUIDE
  };
})(window);
