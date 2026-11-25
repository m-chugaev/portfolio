import Link from "next/link";
import { Dela_Gothic_One, Nunito } from "next/font/google";
import { QuizLoader } from "@/components/quiz/QuizLoader";
import { profile } from "@/data/profile";
import { AUDIT_SERVICE_ID } from "@/data/audit";
import { quizCases, quizFaq, quizModel, quizNiches } from "@/data/quiz";
import { CONVERSION_SERVICE_ID, servicePath } from "@/data/services";
import "./quiz.css";

const display = Dela_Gothic_One({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  display: "swap",
  variable: "--font-qz-display",
  preload: true,
  adjustFontFallback: true,
});

const body = Nunito({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-qz-body",
  preload: false,
  adjustFontFallback: true,
});

const blank = { target: "_blank", rel: "noopener noreferrer" } as const;
const demo = quizModel({ questions: 4 });
const formula = "Конверсия квиза = контакты / начавшие квиз × 100%.";

const deck = [
  {
    id: "biz",
    suit: "♥",
    color: "#C2381A",
    kicker: "Вопрос 1 из 4",
    title: "Какой у вас бизнес?",
    hint: "От ниши зависят вопросы и финальный экран квиза.",
    foot: "1 тап = 1 шаг квиза",
    options: [
      ["services", "c1", "♥", "Услуги и ремонт", "ремонт, клининг, мастера"],
      ["estate", "c2", "♠", "Недвижимость и стройка", "дома, квартиры, участки"],
      ["edu", "c3", "♣", "Обучение и курсы", "школы, курсы, кружки"],
      ["shop", "c4", "♦", "Магазин или производство", "товары под заказ, мебель"],
    ],
  },
  {
    id: "traffic",
    suit: "♠",
    color: undefined,
    kicker: "Вопрос 2 из 4",
    title: "Откуда приходят посетители?",
    hint: "Источник трафика решает, нужен ли квиз вообще.",
    foot: "шаг 2 — часть людей уходит",
    options: [
      ["social", "c1", "♥", "Реклама в соцсетях", "VK, Telegram Ads"],
      ["direct", "c2", "♠", "Яндекс Директ и РСЯ", "контекстная реклама"],
      ["search", "c3", "♣", "Поиск, SEO", "люди ищут сами"],
      ["word", "c4", "♦", "Сарафан и мессенджеры", "рекомендации, чаты"],
    ],
  },
  {
    id: "goal",
    suit: "♣",
    color: "#0B7A52",
    kicker: "Вопрос 3 из 4",
    title: "Что человек получит в конце?",
    hint: "Ради результата люди и доходят до последнего шага.",
    foot: "ещё 1 вопрос — и результат",
    options: [
      ["calc", "c1", "♥", "Расчёт стоимости", "цена по ответам"],
      ["pick", "c2", "♠", "Подбор варианта", "подборка, тариф, модель"],
      ["book", "c3", "♣", "Запись или консультация", "время, звонок, замер"],
      ["lead", "c4", "♦", "Просто заявка", "«перезвоните мне»"],
    ],
  },
  {
    id: "form",
    suit: "♦",
    color: "#C2381A",
    kicker: "Вопрос 4 из 4",
    title: "Как сейчас принимаете заявки?",
    hint: "Последний вопрос. Дальше — ваш результат.",
    foot: "контакт не спрашиваю — это демо",
    options: [
      ["long", "c1", "♥", "Длинная форма", "5+ полей на сайте"],
      ["phone", "c2", "♠", "Телефон и кнопка", "«позвоните нам»"],
      ["nosite", "c3", "♣", "Сайта нет", "только соцсети или Авито"],
      ["hasquiz", "c4", "♦", "Квиз уже есть", "но заявок мало"],
    ],
  },
] as const;

const inside = [
  ["script", "var(--tomato)", "♥", "Сценарий вопросов", "3–6 вопросов из того, что вы спрашиваете у клиента по телефону. Без лишних."],
  ["final", "var(--mint)", "★", "Финальный экран", "Расчёт, подборка или запись — по ответам. Контакт просим здесь."],
  ["design", "var(--sky)", "♠", "Дизайн и адаптив", "Крупные кнопки под палец, быстрая загрузка на мобильном интернете."],
  ["tg", "var(--sun)", "✈", "Заявки в Telegram", "Заявка со всеми ответами сразу приходит вам или менеджеру в Telegram."],
  ["metrika", "var(--pink)", "♣", "Цели в Метрике по шагам", "Отдельная цель на каждый вопрос — видно, где именно уходят люди."],
  ["crm", "#fff", "⇄", "CRM — по задаче", "Передача в amoCRM или Битрикс с ответами в полях — после разбора задачи."],
] as const;

function ChartBars({ compact = false }: { compact?: boolean }) {
  return (
    <>
      {demo.steps.map((item, index) => {
        const height = Math.max(2, Math.sqrt(item.value / 1000) * 82);
        const label = compact
          ? item.last
            ? "✓"
            : index === 0
              ? "вх"
              : `в${index}`
          : item.label;

        return (
          <div className={item.last ? "qz-bar last" : "qz-bar"} key={item.label}>
            <span className="n">{Math.round(item.value)}</span>
            <span className="col" style={{ height: `${height}%` }} />
            <span className="l">{label}</span>
          </div>
        );
      })}
      <div className="qz-bar form">
        <span className="n">{Math.round(demo.form)}</span>
        <span
          className="col"
          style={{ height: `${Math.max(2, Math.sqrt(demo.form / 1000) * 82)}%` }}
        />
        <span className="l">{compact ? "ф" : "форма"}</span>
      </div>
    </>
  );
}

function Answer({ text }: { text: string }) {
  if (!text.startsWith(formula)) {
    return <p>{text}</p>;
  }

  return (
    <p>
      <span className="qz-formula">конверсия квиза = контакты / начавшие квиз × 100%</span>
      <br />
      {text.slice(formula.length).trim()}
    </p>
  );
}

export function QuizLanding() {
  const year = new Date().getFullYear();

  return (
    <div id="qz-root" className={`qz ${display.variable} ${body.variable}`}>
      <a className="qz-skip" href="#qz-main">
        К содержанию
      </a>
      <header className="qz-header">
        <div className="qz-wrap">
          <Link className="qz-logo" href="/">
            web-dev<span>.su</span>
          </Link>
          <nav className="qz-menu" aria-label="Разделы страницы">
            <a href="#flow">Как работает</a>
            <a href="#vs">Квиз или форма</a>
            <a href="#examples">Вопросы</a>
            <a href="#prices">Цены</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="qz-btn" href={profile.contacts.telegram.href} data-ev="cta-head" {...blank}>
            Заказать квиз
          </a>
        </div>
      </header>

      <aside className="qz-board" id="qz-board" aria-label="Табло конверсии, демо">
        <div className="qz-board-h">
          <b>табло · демо</b>
          <button id="qz-board-min" type="button" aria-expanded="true">
            <span className="qz-lbl-open">свернуть</span>
            <span className="qz-lbl-shut">развернуть</span>
            <span className="qz-lbl-chart">график</span>
          </button>
        </div>
        <div className="qz-meter">
          <span className="v">
            <span id="qz-cr">1,5</span>%
          </span>
          <span className="d" id="qz-crd" aria-hidden="true" />
        </div>
        <div className="qz-segs" id="qz-segs" aria-hidden="true">
          {Array.from({ length: 20 }, (_, index) => (
            <i key={index} className={index < 3 ? "on" : undefined} />
          ))}
        </div>
        <div className="qz-cap">шанс заявки от этого визита · демо-модель</div>
        <div className="qz-minichart">
          <div className="qz-cap" style={{ marginBottom: 22 }}>
            доходимость квиза из 1000 визитов · демо
          </div>
          <div className="qz-chart" id="qz-mini" style={{ ["--h" as string]: "86px" }}>
            <ChartBars compact />
          </div>
        </div>
        <ul className="qz-log" id="qz-log" aria-live="polite">
          <li>карты розданы · ждём первый ответ</li>
        </ul>
        <p className="qz-bnote">
          Условные коэффициенты, чтобы показать арифметику квиза. Не статистика и не обещание.
        </p>
      </aside>
      <div className="qz-toast" id="qz-toast" role="status" aria-live="polite" />

      <main id="qz-main">
        <section className="qz-hero" id="hero">
          <div className="qz-wrap">
            <div className="qz-hero-grid">
              <div>
                <p className="qz-kicker">
                  <span aria-hidden="true">♦</span> Услуга · квиз-лендинг
                </p>
                <h1>
                  Квиз для сайта, который <em>доводит до заявки</em>
                </h1>
                <p className="qz-lead">
                  Делаю квиз-лендинги и квизы для сайта: короткие вопросы вместо длинной формы, заявка с ответами — сразу в Telegram. Эта страница сама устроена как квиз: ответьте на 4 вопроса, и она перестроится под вашу задачу.
                </p>
                <div className="qz-hero-cta">
                  <a className="qz-btn" href="#qz-deck" data-ev="cta-hero">
                    Пройти 4 вопроса ↓
                  </a>
                  <a className="qz-btn qz-btn-alt" href={profile.contacts.telegram.href} data-ev="cta-hero" {...blank}>
                    Написать в Telegram
                  </a>
                </div>
                <div className="qz-hand" id="qz-hand" aria-live="polite">
                  <span className="lbl">Ваша рука:</span>
                  <span className="qz-chip empty">бизнес</span>
                  <span className="qz-chip empty">трафик</span>
                  <span className="qz-chip empty">цель</span>
                  <span className="qz-chip empty">форма сейчас</span>
                </div>
                <div className="qz-facts">
                  <span className="qz-fact">
                    <b>от 10 000 ₽</b> за уникальную страницу
                  </span>
                  <span className="qz-fact">
                    <b>от 2 дней</b> на квиз-лендинг
                  </span>
                  <span className="qz-fact">
                    заявки <b>в Telegram</b>
                  </span>
                </div>
              </div>
              <div id="qz-deck">
                <div className="qz-deck-meta">
                  <span id="qz-deck-label">4 вопроса и результат</span>
                  <span className="qz-pips" id="qz-pips" aria-hidden="true">
                    <i className="qz-pip cur" />
                    <i className="qz-pip" />
                    <i className="qz-pip" />
                    <i className="qz-pip" />
                  </span>
                </div>
                <div className="qz-deck">
                  {deck.map((card, index) => (
                    <div
                      className="qz-card"
                      data-q={card.id}
                      role="group"
                      aria-labelledby={`qz-q${index + 1}`}
                      key={card.id}
                    >
                      <span className="qz-corner tl" style={{ color: card.color }} aria-hidden="true">
                        {card.suit}
                      </span>
                      <span className="qz-corner br" style={{ color: card.color }} aria-hidden="true">
                        {card.suit}
                      </span>
                      <p className="qz-qn">{card.kicker}</p>
                      <p className="q" id={`qz-q${index + 1}`}>
                        {card.title}
                      </p>
                      <p className="qz-hint">{card.hint}</p>
                      <div className="qz-opts">
                        {card.options.map((option) => (
                          <button
                            className={`qz-opt ${option[1]}`}
                            type="button"
                            data-v={option[0]}
                            aria-pressed="false"
                            key={option[0]}
                          >
                            <span className="s" aria-hidden="true">
                              {option[2]}
                            </span>
                            {option[3]}
                            <small>{option[4]}</small>
                          </button>
                        ))}
                      </div>
                      <div className="qz-card-foot">
                        {index > 0 ? (
                          <button className="qz-linkbtn" type="button" data-back>
                            ← назад
                          </button>
                        ) : null}
                        <span>{card.foot}</span>
                      </div>
                    </div>
                  ))}
                  <div className="qz-card result" id="qz-result">
                    <span className="qz-corner tl" aria-hidden="true">★</span>
                    <span className="qz-corner br" aria-hidden="true">★</span>
                    <p className="qz-qn" style={{ color: "#123d2e" }}>
                      Ваш результат · пример рекомендации
                    </p>
                    <p className="qz-rtitle" id="qz-result-title">
                      Ответьте на 4 вопроса — здесь появится рекомендация
                    </p>
                    <ul id="qz-result-list">
                      <li>Формат: квиз-лендинг или квиз на существующем сайте.</li>
                      <li>Первый вопрос и финальный экран под вашу нишу.</li>
                      <li>Что измерять: доходимость по каждому шагу в Метрике.</li>
                    </ul>
                    <div className="qz-ract">
                      <a className="qz-btn qz-btn-alt" href={profile.contacts.telegram.href} data-ev="cta-result" {...blank}>
                        Обсудить квиз в Telegram →
                      </a>
                      <button className="qz-btn qz-btn-ghost" id="qz-copy" type="button">
                        Скопировать ответы
                      </button>
                    </div>
                    <div className="qz-card-foot">
                      <button className="qz-linkbtn" id="qz-redeal" type="button">
                        ↺ пересдать
                      </button>
                      <span>собрано по правилам на странице</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="qz-flow">
          <section className="qz-blk qz-band-paper" id="flow" data-sec="Как квиз удерживает">
            <div className="qz-wrap">
              <span className="qz-picked">поднято под ваш ответ</span>
              <div className="qz-sec-head">
                <div>
                  <p className="qz-kicker"><span aria-hidden="true">♥</span> механика</p>
                  <h2>Как квиз удерживает конверсию</h2>
                </div>
                <p className="qz-lead">
                  Квиз не магия: он делит одну большую просьбу «оставьте телефон» на несколько лёгких шагов. На каждом шаге часть людей уходит, и это видно в цифрах.
                </p>
              </div>
              <div className="qz-flow-grid">
                <div className="qz-rules">
                  <div className="qz-rule">
                    <span className="s" style={{ color: "#C2381A" }} aria-hidden="true">♥</span>
                    <h3>Один вопрос на экран</h3>
                    <p>Ответ в один тап, без клавиатуры. На телефоне это особенно важно.</p>
                  </div>
                  <div className="qz-rule">
                    <span className="s" aria-hidden="true">♠</span>
                    <h3>Прогресс виден</h3>
                    <p>«Вопрос 3 из 4» — человек знает, сколько осталось.</p>
                  </div>
                  <div className="qz-rule">
                    <span className="s" style={{ color: "#0B7A52" }} aria-hidden="true">♣</span>
                    <h3>Контакт — в конце</h3>
                    <p>Телефон просим, когда человек уже вложил ответы и ждёт результат.</p>
                  </div>
                  <div className="qz-rule">
                    <span className="s" style={{ color: "#C2381A" }} aria-hidden="true">♦</span>
                    <h3>Результат по ответам</h3>
                    <p>Расчёт, подборка или запись — то, ради чего стоит дойти до конца.</p>
                  </div>
                </div>
                <div className="qz-bigchart" id="qz-bigchart">
                  <div className="top">
                    <b>Доходимость по шагам</b>
                    <span className="qz-demo">демо-модель</span>
                  </div>
                  <div
                    className="qz-chart"
                    id="qz-chart"
                    style={{ ["--h" as string]: "200px", marginTop: 26 }}
                    role="img"
                    aria-label="Демо-график доходимости квиза по шагам"
                  >
                    <ChartBars />
                  </div>
                  <div className="qz-ctrl">
                    <label htmlFor="qz-nq">
                      Вопросов в квизе: <output id="qz-nqv">4</output>
                    </label>
                    <input id="qz-nq" type="range" min={2} max={8} defaultValue={4} step={1} />
                    <label>
                      <input id="qz-form-toggle" type="checkbox" defaultChecked /> показать обычную форму
                    </label>
                  </div>
                  <div className="qz-sum">
                    <div>
                      <small>начали квиз</small>
                      <b id="qz-start">{Math.round(demo.start)}</b>
                    </div>
                    <div>
                      <small>оставили контакт</small>
                      <b id="qz-quiz">
                        {Math.round(demo.quiz)} · {(demo.quiz / 10).toFixed(1).replace(".", ",")}%
                      </b>
                    </div>
                    <div>
                      <small>форма, для сравнения</small>
                      <b id="qz-form">
                        {Math.round(demo.form)} · {(demo.form / 10).toFixed(1).replace(".", ",")}%
                      </b>
                    </div>
                  </div>
                  <p className="qz-note" id="qz-note">
                    Из 1000 условных визитов. Коэффициенты придуманы для демонстрации и меняются от ваших ответов. Реальные доли берём из Метрики: цель на каждый шаг квиза.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="qz-blk" id="vs" data-sec="Квиз или форма">
            <div className="qz-wrap">
              <span className="qz-picked">поднято под ваш ответ</span>
              <div className="qz-sec-head">
                <div>
                  <p className="qz-kicker"><span aria-hidden="true">♠</span> честно</p>
                  <h2>Квиз или обычная форма: когда что</h2>
                </div>
                <p className="qz-lead">
                  Квиз нужен не всем. Если человек уже знает, что хочет, лишние вопросы только мешают.
                </p>
              </div>
              <div className="qz-vs">
                <div className="qz-vs-row head" aria-hidden="true">
                  <div>Откуда трафик</div>
                  <div>Квиз</div>
                  <div>Короткая форма</div>
                </div>
                <div className="qz-vs-row" data-t="social">
                  <div>Реклама в соцсетях</div>
                  <div className="qz-win qz-yes">Чаще подходит: спрос не сформулирован, квиз помогает его собрать</div>
                  <div>Длинная форма на холодном трафике — частая точка ухода</div>
                </div>
                <div className="qz-vs-row" data-t="direct">
                  <div>Яндекс Директ и РСЯ</div>
                  <div className="qz-win qz-yes">В РСЯ — как в соцсетях; на поиске — как второй путь</div>
                  <div>Для горячих поисковых запросов в Директе</div>
                </div>
                <div className="qz-vs-row" data-t="search">
                  <div>Поиск, SEO</div>
                  <div>Как дополнение: кнопка «рассчитать стоимость»</div>
                  <div className="qz-win qz-yes">Чаще подходит: человек ищет конкретное, ему нужен ответ и контакт</div>
                </div>
                <div className="qz-vs-row" data-t="word">
                  <div>Сарафан и мессенджеры</div>
                  <div>Если нужно быстро квалифицировать заявку</div>
                  <div className="qz-win qz-yes">Или сразу Telegram-бот: меню и сбор заявки</div>
                </div>
              </div>
              <p className="qz-note" style={{ color: "var(--mut)", marginTop: 16 }}>
                Это правила выбора, а не статистика. Что работает у вас, видно только по целям в Метрике.
              </p>
            </div>
          </section>

          <section className="qz-blk qz-band-sun" id="examples" data-sec="Вопросы для ниши">
            <div className="qz-wrap">
              <span className="qz-picked">поднято под ваш ответ</span>
              <div className="qz-sec-head">
                <div>
                  <p className="qz-kicker"><span aria-hidden="true">♣</span> примеры</p>
                  <h2>Вопросы квиза для вашей ниши</h2>
                </div>
                <p className="qz-lead">
                  Пример сценария: четыре вопроса и финальный экран. В работе вопросы собираем из того, что менеджер спрашивает в первые минуты звонка.
                </p>
              </div>
              <div className="qz-tabs" role="tablist" aria-label="Ниша">
                {quizNiches.map((niche, index) => (
                  <button
                    className="qz-tab"
                    type="button"
                    role="tab"
                    id={`qz-tab-${niche.id}`}
                    aria-controls={`qz-panel-${niche.id}`}
                    aria-selected={index === 0}
                    tabIndex={index === 0 ? 0 : -1}
                    key={niche.id}
                  >
                    {niche.label}
                  </button>
                ))}
              </div>
              {quizNiches.map((niche, index) => (
                <div
                  className="qz-tabpanel"
                  role="tabpanel"
                  id={`qz-panel-${niche.id}`}
                  aria-labelledby={`qz-tab-${niche.id}`}
                  hidden={index !== 0}
                  key={niche.id}
                >
                  {niche.questions.map((question, questionIndex) => (
                    <div className="qz-mini" key={question[0]}>
                      <span className="k">вопрос {questionIndex + 1}</span>
                      <b>{question[0]}</b>
                      {question[1]}
                    </div>
                  ))}
                  <div className="qz-mini fin">
                    <span className="k">финальный экран</span>
                    <b>{niche.final}</b>
                    {niche.finalNote}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="qz-blk" id="inside" data-sec="Что входит">
            <div className="qz-wrap">
              <span className="qz-picked">поднято под ваш ответ</span>
              <div className="qz-sec-head">
                <div>
                  <p className="qz-kicker"><span aria-hidden="true">♦</span> состав</p>
                  <h2>Что входит в квиз-лендинг</h2>
                </div>
                <p className="qz-lead">
                  Квиз-лендинг — это мини-сайт, где квиз стоит на первом экране. Можно сделать отдельную страницу под рекламу или встроить квиз в ваш сайт.
                </p>
              </div>
              <div className="qz-cards6">
                {inside.map((card) => (
                  <div className="qz-icard" data-k={card[0]} key={card[0]}>
                    <span className="s" style={{ background: card[1] }} aria-hidden="true">
                      {card[2]}
                    </span>
                    <h3>{card[3]}</h3>
                    <p>{card[4]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="qz-blk qz-band-mint" id="prices" data-sec="Цены">
            <div className="qz-wrap">
              <span className="qz-picked">поднято под ваш ответ</span>
              <div className="qz-sec-head">
                <div>
                  <p className="qz-kicker"><span aria-hidden="true">★</span> цены</p>
                  <h2>Сколько стоит квиз-лендинг</h2>
                </div>
                <p className="qz-lead">
                  Квиз считаю как мини-сайт: цена за уникальную страницу. Точную сумму назову после разбора задачи.
                </p>
              </div>
              <div className="qz-prices">
                <div className="qz-pcard main" data-p="quiz">
                  <span className="qz-tagp">основная услуга</span>
                  <h3>Квиз-лендинг или мини-сайт с квизом</h3>
                  <ul>
                    <li>Сценарий, дизайн, адаптив</li>
                    <li>Отправка заявок с ответами в Telegram</li>
                    <li>Цели в Метрике на каждый шаг</li>
                  </ul>
                  <div className="qz-pr">
                    от 10 000 ₽<small>за уникальную страницу · от 2 дней</small>
                  </div>
                  <a className="qz-btn" href={profile.contacts.telegram.href} data-ev="cta-price" {...blank}>
                    Обсудить квиз →
                  </a>
                </div>
                <Link className="qz-pcard" href={servicePath("integrations")} data-p="crm" data-ev="price">
                  <span className="qz-tagp">интеграции</span>
                  <h3>Заявки в CRM</h3>
                  <p className="qz-pd">amoCRM, Битрикс, Tilda, подключение интернет-эквайринга</p>
                  <div className="qz-pr s">после разбора<small>задачи</small></div>
                </Link>
                <Link className="qz-pcard" href={servicePath("telegram-bots")} data-p="bot" data-ev="price">
                  <span className="qz-tagp">вместо сайта</span>
                  <h3>Telegram-бот для заявок</h3>
                  <p className="qz-pd">Меню и сбор заявки по шагам прямо в Telegram</p>
                  <div className="qz-pr s">от 10 000 ₽<small>3–5 дней</small></div>
                </Link>
                <Link className="qz-pcard" href={servicePath(AUDIT_SERVICE_ID)} data-p="audit" data-ev="price">
                  <span className="qz-tagp">квиз уже есть</span>
                  <h3>Аудит конверсии</h3>
                  <p className="qz-pd">Разбор доходимости по шагам и список правок</p>
                  <div className="qz-pr s">после разбора<small>задачи</small></div>
                </Link>
                <Link className="qz-pcard" href={servicePath("web-apps")} data-p="app" data-ev="price">
                  <span className="qz-tagp">сложнее квиза</span>
                  <h3>Веб-приложения и кабинеты</h3>
                  <p className="qz-pd">Калькуляторы, запись, личный кабинет</p>
                  <div className="qz-pr s">от 10 000 ₽<small>за экран или страницу</small></div>
                </Link>
              </div>
            </div>
          </section>

          <section className="qz-blk" id="process" data-sec="Процесс">
            <div className="qz-wrap">
              <span className="qz-picked">поднято под ваш ответ</span>
              <div className="qz-sec-head">
                <div>
                  <p className="qz-kicker"><span aria-hidden="true">♠</span> процесс</p>
                  <h2>Как я делаю квиз для сайта</h2>
                </div>
              </div>
              <div className="qz-steps">
                <div className="qz-step"><div className="num">1</div><h3>Разбор</h3><p>Откуда трафик, что считается заявкой, какие вопросы задаёт менеджер.</p></div>
                <div className="qz-step"><div className="num">2</div><h3>Сценарий</h3><p>Вопросы, ответы, финальный экран. Согласуем текстом до дизайна.</p></div>
                <div className="qz-step"><div className="num">3</div><h3>Сборка</h3><p>Страница, адаптив, отправка в Telegram, цели в Метрике.</p></div>
                <div className="qz-step"><div className="num">4</div><h3>Замер</h3><p>Смотрим доходимость по шагам и правим вопрос, на котором уходят.</p></div>
              </div>
            </div>
          </section>

          <section className="qz-blk qz-band-sun" id="more" data-sec="Другие страницы">
            <div className="qz-wrap">
              <span className="qz-picked">поднято под ваш ответ</span>
              <div className="qz-sec-head">
                <div>
                  <p className="qz-kicker"><span aria-hidden="true">♣</span> по теме</p>
                  <h2>Другие страницы про конверсию</h2>
                </div>
              </div>
              <div className="qz-more">
                <Link className="qz-mcard" href={servicePath(CONVERSION_SERVICE_ID)} data-m="up" data-ev="link">
                  <span className="k">услуга</span>
                  <h3>Повышение конверсии сайта и лендинга</h3>
                  <p>Правки первого экрана, форм и скорости, замер до и после.</p>
                </Link>
                <Link className="qz-mcard" href={servicePath(AUDIT_SERVICE_ID)} data-m="audit" data-ev="link">
                  <span className="k">услуга</span>
                  <h3>Анализ и аудит конверсии сайта</h3>
                  <p>Где теряются посетители и что поправить первым. Подходит и для готового квиза.</p>
                </Link>
              </div>
            </div>
          </section>
        </div>

        <section className="qz-blk" id="cases" data-sec="Кейсы">
          <div className="qz-wrap">
            <div className="qz-sec-head">
              <div>
                <p className="qz-kicker"><span aria-hidden="true">♥</span> опыт</p>
                <h2>Над чем я работал</h2>
              </div>
            </div>
            <div className="qz-cases">
              {quizCases.map((item) => (
                <Link className="qz-case" href={item.href} data-ev="case" key={item.href}>
                  <span className="role">{item.role}</span>
                  {"concept" in item && item.concept ? <span className="qz-cpt">концепт</span> : null}
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="go">читать кейс →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="qz-blk qz-band-paper" id="faq" data-sec="FAQ">
          <div className="qz-wrap">
            <div className="qz-sec-head">
              <div>
                <p className="qz-kicker"><span aria-hidden="true">♠</span> вопросы</p>
                <h2>Вопросы про квизы и их конверсию</h2>
              </div>
            </div>
            <div className="qz-faq">
              {quizFaq.map((item) => (
                <details key={item.question}>
                  <summary data-ev="faq">{item.question}</summary>
                  <Answer text={item.answer} />
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="qz-blk" id="contact" data-sec="Контакт">
          <div className="qz-wrap">
            <div className="qz-final">
              <div>
                <p className="qz-kicker"><span aria-hidden="true">★</span> следующий ход</p>
                <h2>Расскажите про трафик — предложу сценарий квиза</h2>
                <p className="qz-lead">
                  Напишите в Telegram: что продаёте, откуда приходят люди и как сейчас принимаете заявки. Отвечу, нужен ли вам квиз, и назову стоимость.
                </p>
                <div className="qz-yourhand">
                  <h3>Ваши ответы с этой страницы</h3>
                  <p id="qz-summary">
                    Пока пусто. Ответьте на 4 вопроса наверху — здесь появится краткая сводка, которую можно скопировать в сообщение.
                  </p>
                </div>
              </div>
              <div className="qz-links">
                <a href={profile.contacts.telegram.href} data-ev="cta-final" {...blank}>
                  <span>Telegram</span>
                  <span>{profile.contacts.telegram.label} →</span>
                </a>
                <a href={profile.contacts.email.href} data-ev="cta-final">
                  <span>Email</span>
                  <span>{profile.contacts.email.label} →</span>
                </a>
                <a href={profile.contacts.habr.href} data-ev="link" {...blank}>
                  <span>Профиль</span>
                  <span>{profile.contacts.habr.label} →</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="qz-footer">
        <div className="qz-wrap">
          <span>© {year} {profile.name} · web-dev.su</span>
          <span>Табло и график на странице — демо-модель, не статистика</span>
          <nav aria-label="Ещё на сайте">
            <Link href="/">Главная</Link>
            <Link href="/services">Все услуги</Link>
            <Link href={servicePath(CONVERSION_SERVICE_ID)}>Повышение конверсии</Link>
            <Link href={servicePath(AUDIT_SERVICE_ID)}>Аудит конверсии</Link>
          </nav>
        </div>
      </footer>
      <noscript>
        <style>{".qz-deck{min-height:0}.qz-card{position:static!important;width:auto;margin:0 0 16px;opacity:1!important;transform:none!important;pointer-events:auto!important;visibility:visible!important}.qz-card>*{visibility:visible!important}"}</style>
      </noscript>
      <QuizLoader />
    </div>
  );
}
