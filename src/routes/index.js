import React, { useState, useRef } from "react"
import { ReactComponent as QuoteOpen } from "../assets/images/quote-open.svg"
import { ReactComponent as QuoteClose } from "../assets/images/quote-close.svg"
import ringsUrl from "../assets/images/rings.png"
import testingImageUrl from "../assets/images/homepage/testing.png"
import prototypeImageUrl from "../assets/images/homepage/prototype.png"
import overlayMeteorsImageUrl from "../assets/images/homepage/overlay-meteors.png"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import Snippet from "../components/snippet"
import { Link } from "@reach/router"
import { useRouter } from "../hooks/use-router"
import { SectionWithLines, AspectRatio } from "../components/ui"
import { keyframes } from "styled-components"
import Vimeo from "@u-wave/react-vimeo"

import { useSpring, animated, useTransition } from "react-spring"
import { usePrevious } from "../hooks/use-previous"
import useIsMountedRef from "../hooks/use-is-mounted-ref"

const scroll = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-988px);
  }
`

export default function IndexPage() {
  let isMounted = useIsMountedRef()
  const router = useRouter()
  const data = useStaticQuery(graphql`
    query {
      testimonialCarlos: file(
        relativePath: { eq: "homepage/carlos.jpeg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 128, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      testimonialLutero: file(
        relativePath: { eq: "homepage/lutero.jpeg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 128, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  let segments = {
    createServer: { start: 0, end: 62.05 },
    useDatabase: { start: 62.05, end: 177.75 },
    seedFactories: { start: 177.75, end: 266 },
    writeTests: { start: 266, end: 426 },
  }

  let videoPlayer = useRef()
  let [currentTime, setCurrentTime] = useState(0)
  let [playerState, setPlayerState] = useState("loading")

  let currentSegment =
    Object.keys(segments).find((name) => {
      let segment = segments[name]
      return segment.start <= currentTime && segment.end > currentTime
    }) || Object.keys(segments)[0]

  function handleTimeUpdate(event) {
    setCurrentTime(event.seconds)
  }

  async function seekVideo(time) {
    await videoPlayer.current.player.setCurrentTime(time)
  }

  async function pauseVideo() {
    await videoPlayer.current.player.pause()
    if (isMounted.current) {
      setPlayerState("paused")
    }
  }

  async function playVideo() {
    await videoPlayer.current.player.play()
    if (isMounted.current) {
      setPlayerState("playing")
    }
  }

  return (
    <div className="relative">
      <div className="relative z-10">
        <SEO />

        <SectionWithLines>
          <div className="pt-8 pb-20 md:pt-16 lg:pt-16 md:pb-32 xl:pb-40 2xl:pb-48">
            <Gutters>
              <Container>
                <div className="md:text-center">
                  <h1
                    className="tracking-tight text-white leading-tighter text-4-5xl font-title md:text-4-75xl md:leading-tighter lg:text-5xl 2xl:text-5-5xl "
                    data-testid="title"
                  >
                    Construa aplicações completas,{" "}
                    <br className="hidden md:block" />
                    <span className="text-green-500">
                      com o Angola API.
                    </span>
                  </h1>

                  <div className="flex justify-center mt-8 md:mt-10">
                    <Text color="light-gray">
                      Angola API é um projecto open source, criado por angolanos 
                      e para angolanos com objectivo
                      de facilitar os programadores a obterem informações oficiais da banca, validações de números nacionais, bilhete de identidade, informações de localização nacional entre outros. 
                    </Text>
                  </div>

                  <div className="flex flex-col mt-8 md:mt-10 sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
    
                    <Link
                      to={router.routerFor("/docs").pages[0].url}
                      className="flex items-center justify-center px-4 py-3 text-lg font-medium text-center text-green-500 hover:text-green-700 rounded md:py-2 sm:w-1/2 md:w-auto"
                    >
                      Leia a documentação <Caret className="inline w-2 ml-2" />
                    </Link>
                  </div>
                </div>
              </Container>
            </Gutters>

            <div className="mt-16 md:mt-20 2xl:mt-24"></div>

     
            <div className="mt-12"></div>

            <Gutters>
              <div className="max-w-lg mx-auto md:max-w-4xl 2xl:max-w-5xl">
                               
                <div className="h-41 mt-3 overflow-hidden md:h-32 md:mt-10 md:text-center md:flex md:justify-center">
                  <FadeBetween currentSegment={currentSegment}>
                    <State for="createServer">
                      <Text color="light-gray">
                        Alavanca as suas aplicações com o Angola API,
                        a api do Angola API possui informações da banca
                        angolana, provenientes do site do Banco Nacional
                        de Angola, a api do Angola API também possui validações
                        de dados nacionais como bilhete de identidade, passaporte
                        entre outros.
                      </Text>
                    </State>
                  </FadeBetween>
                </div>
              </div>
            </Gutters>
          </div>
        </SectionWithLines>

        <section
          className="relative py-16 overflow-hidden bg-white bg-no-repeat xl:py-32 md:py-24"
          style={{
            backgroundPosition: "center top, center top -43px",
            backgroundImage: `linear-gradient(rgba(255,255,255,.75) 80%, rgba(255,255,255,1) 95%), url(${ringsUrl})`,
            backgroundSize: "100%, 1100px",
          }}
        >
          <div className="relative z-10 max-w-6xl mx-auto md:text-center xl:text-left">
            <div className="xl:flex xl:-mx-8">
              <div className="xl:w-1/2 xl:pt-10 xl:px-8">
                <div className="px-5 md:px-8 xl:px-0">
                  <div className="max-w-lg mx-auto md:max-w-xl">
                    <Title>
                      A  <span className="text-green-500">melhor</span> forma
                      de validar.
                    </Title>

                    <div className="mt-4"></div>

                    <Text color="dark-gray">
                      Angola API usa as melhores tecnologias para o backend, deixando assim os endpoits rápidos a nível de respostas por parte de quem faz a requisição.
                    </Text>
                    <div className="mt-4">
                      <Text color="dark-gray">
                      Escrita de forma legível e intuitiva o Angola API é de fácil percepção, sendo assim facilitando a colaboração por parte de quem quiser ajudar no crescimento do projecto.
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2 mt-8 xl:ml-auto xl:w-1/2 xl:mt-0 xl:px-8">
                <div className="max-w-lg mx-auto md:max-w-xl">
                  <div className="overflow-hidden rounded-lg">
                    <Snippet name="homepage-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-500 md:py-20 xl:py-24">
          <Gutters>
            <div className="max-w-lg mx-auto xl:max-w-2xl">
              <div className="relative">
                <QuoteOpen className="absolute w-20 text-green-400 fill-current md:-ml-10" />
                <QuoteClose className="absolute bottom-0 right-0 w-20 text-green-400 fill-current md:-mr-5" />
                <div className="relative pt-8 pb-6 text-lg text-white xl:text-xl max-w-measure">
                  <p>
                    Com as dificuldades de encontrar informações relativas a dados
                    como as taxas dos bancos de Angola, dificulade de encontrar 
                    listas de munípios de Angola entre outros dados importantes para 
                    implementação em sites ou aplicativos de Angola.
                  </p>
                  <p className="mt-4">
                    Chamei meu amigo Adilson M. Fuxe para criarmos a Angola API,
                    um dos maiores projectos open source de Angola. Nos inspiramos
                     na ideia do Filipe Deschamps criador do Brasil API.
                  </p>
                  <p className="mt-4">
                    Eu e Adilson Fuxe conseguimos distribuir algumas informações.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mt-6">
                <Img
                  className="w-24 mr-4 rounded-full xl:w-32 xl:mr-6"
                  fluid={data.testimonialLutero.childImageSharp.fluid}
                />
                <div className="flex-shrink-0 leading-none">
                  <p className="text-lg font-medium text-white">
                    <a href="https://github.com/luteroelavoco">Lútero Elavoco</a>
                  </p>
                  <p className="mt-2 text-green-200">
                    Criador da Angola API
                  </p>
                </div>
              </div>
            </div>
          </Gutters>
        </section>

        <section
          className="relative pt-16 bg-gray-100 md:pt-24 xl:pt-32 md:text-center xl:text-left"
          style={{
            background: `linear-gradient(173deg, rgb(243, 245, 247) calc(100% - (.25 * 55vw)), #fff calc(100% - (.25 * 55vw)))`,
          }}
        >
          <Gutters>
            <div className="max-w-lg mx-auto md:max-w-xl xl:max-w-6xl">
              <div className="xl:flex xl:-mx-8">
                <div className="xl:w-2/5 xl:px-8">
                  <div className="xl:pt-12">
                    <Title>
                      Faça os{" "}
                      <span className="text-green-500">
                        seus projectos
                      </span>{" "}
                      de forma simplificada.
                    </Title>

                    <div className="mt-4 xl:mt-8">
                      <Text color="dark-gray">
                        Ao usar o Angola API, evita usar ragex's de fontes desconhecidas,
                        o Angola API é um projecto de código aberto, logo podes dar uma 
                        olhada no código fonte do projecto, de forma analisar a sua legitibilidade.
                      </Text>

                      <div className="mt-4">
                        <Text color="dark-gray">
                          Podes sempre também contribuir no projecto, adicionar novas 
                          funcionalidades no projecto, melhorar as funcionalidade actuais ou 
                          simplesmente apoiar o projecto, compartilhando na comunidade de programadores,
                          ou simplesmente incentivar o uso da mesma.
                        </Text>
                      </div>

                      <div className="mt-6">
                        <Link
                          to="/docs/docs/getting-started/introduction/"
                          className="inline-flex items-center font-medium text-green-500 md:text-lg"
                          css={`
                            &:hover svg {
                              transform: translateX(5px);
                            }
                          `}
                        >
                          Saiba mais{" "}
                          <Caret
                            className="w-2"
                            style={{
                              marginLeft: "10px",
                              transition: "all 0.15s",
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto mt-16 xl:w-3/5 xl:px-8 xl:mt-0">
                  <img src={testingImageUrl} alt="Browsers" />

                  <div
                    css={`
                      position: absolute;
                      overflow: hidden;
                      width: 141%;
                      left: 50%;
                      height: 53%;
                      top: 24%;
                      transform: translateX(-50%) translateY(-50%) scale(0.6);

                      @media (min-width: 768px) {
                        transform: translateX(-50%) translateY(-50%) scale(0.7);
                        width: 121%;
                        height: 48%;
                      }

                      @media (min-width: 1280px) {
                        width: 110.5%;
                      }
                    `}
                  >
                    <div
                      className="absolute z-10 w-full"
                      style={{
                        top: "-2px",
                        bottom: "-2px",
                        background:
                          "linear-gradient(0deg, #1A1C1D, transparent 20%, transparent 97%, #1A1C1D 97.5%)",
                      }}
                    ></div>

                    <div
                      css={`
                        animation: ${scroll} 90s linear infinite;
                      `}
                    >
                      <Snippet
                        name="homepage-2"
                        backgroundColor="transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Gutters>
        </section>

        <section
          className="pt-24 pb-16 bg-white bg-no-repeat bg-contain md:pt-32 xl:pb-48 md:text-center"
          css={`
            background-image: url(${overlayMeteorsImageUrl});
            background-size: 350%;
            background-position: calc(50% + 50px) bottom;

            @media (min-width: 480px) {
              background-size: 1600px;
            }

            @media (min-width: 1280px) {
              background-size: 2000px;
              background-position: calc(50% - 230px) calc(100% - 40px);
            }
          `}
        >
          <Gutters>
            <div className="max-w-lg mx-auto md:max-w-xl xl:max-w-6xl">
              <div className="xl:inline-flex">
                <div className="lg:mr-6 xl:order-last xl:text-left xl:max-w-lg xl:px-8">
                  <div className="xl:mt-32">
                    <Title>
                      Alta{" "}
                      <span className="text-green-500">escalabilidade</span>{" "}
                      rápido e seguro.
                    </Title>
                  </div>

                  <div className="mt-4 xl:mt-8">
                    <Text color="dark-gray">
                      Escrito com as melhores práticas de programação a Angola API
                      possui boas práticas de escrita de código da actualidade,
                      tais boas práticas incluem o <b>clean code</b>, <b>clean architecture</b>, entre outras.
                    </Text>
                  </div>
                  <div className="mt-4">
                    <Text color="dark-gray">
                      Obtenha resultados rápidos de dados da banca nacional de forma segura,
                      performática e provenientes directamente do site oficial do <b>Banco 
                      Nacional de Angola</b>.
                    </Text>
                  </div>
                  <div className="mt-6">
                    <a
                      target="blank"
                      href="https://github.com/Angola-Api/Angola-Api"
                      className="inline-flex items-center font-medium text-green-500 md:text-lg"
                      css={`
                        &:hover svg {
                          transform: translateX(5px);
                        }
                      `}
                    >
                      Ver o código{" "}
                      <Caret
                        className="inline w-2"
                        style={{ marginLeft: "10px", transition: "all 0.15s" }}
                      />
                    </a>
                  </div>
                </div>

                <div className="max-w-sm mx-auto mt-12 xl:mr-4 xl:pr-16 xl:w-full xl:max-w-xl">
                  <img src={prototypeImageUrl} alt="" />
                </div>
              </div>
            </div>
          </Gutters>
        </section>

        <section className="py-16 bg-gray-600 md:py-20 xl:py-24">
          <Gutters>
            <div className="max-w-lg mx-auto xl:max-w-2xl">
              <div className="relative">
                <QuoteOpen className="absolute w-20 text-gray-500 opacity-50 fill-current md:-ml-10" />
                <QuoteClose className="absolute bottom-0 right-0 w-20 text-gray-500 opacity-50 fill-current md:-mr-5" />
                <div className="relative pt-8 pb-6">
                  <p className="text-lg text-white xl:text-xl max-w-measure">
                    Honestamente falando depois de começar a usar o Angola API, tive um aumento de productividade em projectos que precisava de validações específicas para Angola.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mt-6">
                <Img
                  className="w-24 mr-4 rounded-full xl:w-32 xl:mr-6"
                  fluid={data.testimonialCarlos.childImageSharp.fluid}
                />
                <div className="flex-shrink-0 leading-none">
                  <p className="text-lg font-medium text-white">
                    <a href="https://carlcr.com">Carlos Garcia</a>
                  </p>
                  <p className="mt-2 text-gray-300">Programador frontend</p>
                </div>
              </div>
            </div>
          </Gutters>
        </section>

        <section className="pt-24 pb-32 bg-white xl:py-40">
          <div className="text-center">
            <Gutters>
              <Container>
                <h2 className="tracking-tight leading-tighter text-4-5xl font-title md:text-4-75xl md:leading-tighter lg:text-5xl">
                  Começa já usar
                </h2>

                <div className="max-w-xs mx-auto mt-6 lg:max-w-sm">
                  <p className="text-lg text-gray-700 lg:text-1-5xl max-w-measure">
                    Angola API é de código aberto, logo podes contribuir, ajudando assim o eco-sistema open source angolano.
                  </p>
                </div>

                <div className="mt-12">
                  <Link
                    to={router.routerFor("/docs").pages[0].url}
                    className="inline-flex items-center px-4 py-3 text-lg font-medium text-center text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Começar
                    <Caret className="inline w-2 ml-2" />
                  </Link>
                </div>
              </Container>
            </Gutters>
          </div>
        </section>
      </div>
    </div>
  )
}

 

function Gutters({ children }) {
  return <div className="px-5 md:px-8">{children}</div>
}

function Container({ children }) {
  return <div className="max-w-lg mx-auto md:max-w-full">{children}</div>
}

function Title({ children }) {
  return (
    <h2 className="text-3xl leading-tight md:text-4xl text-gray-1000 xl:text-4-5xl font-title">
      {children}
    </h2>
  )
}

function Text({ children, color }) {
  let styles = {
    "light-gray": "text-gray-500",
    "dark-gray": "text-gray-700",
  }

  if (styles[color] === undefined) {
    throw new Error("<Text> requires a color.")
  }

  return (
    <p className={`${styles[color]} md:text-lg max-w-measure`}>{children}</p>
  )
}

function Caret(props) {
  return (
    <svg {...props} viewBox="0 0 7 12">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="stroke-current" strokeWidth="1.5">
          <polyline id="Path-5" points="1 1 6 6 1 11"></polyline>
        </g>
      </g>
    </svg>
  )
}

function FadeBetween({ children, currentSegment }) {
  let segments = React.Children.toArray(children).reduce((memo, child) => {
    memo[child.props.for] = child.props.children

    return memo
  }, {})

  const transitions = useTransition(currentSegment, (i) => i, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <div className="relative w-full">
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div className="absolute w-full" style={props} key={key}>
            <div className="flex justify-center">{segments[item]}</div>
          </animated.div>
        )
      })}
    </div>
  )
}

function State() {}
