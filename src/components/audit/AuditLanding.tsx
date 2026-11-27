import Link from "next/link";
import { IBM_Plex_Mono, Onest, Tektur } from "next/font/google";
import { AuditLoader } from "@/components/audit/AuditLoader";
import {
  auditCases,
  auditDeliverables,
  auditFaq,
  auditFunnelRows,
  auditProcess,
  auditQuestions,
  auditReportRows,
  auditSections,
  auditStages,
  formatAudit,
} from "@/data/audit";
import { profile } from "@/data/profile";
import { QUIZ_SERVICE_ID } from "@/data/quiz";
import { CONVERSION_SERVICE_ID, servicePath } from "@/data/services";
import "./audit.css";

const display = Tektur({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "700", "800"],
  display: "swap",
  variable: "--font-au-display",
  preload: true,
  adjustFontFallback: true,
});

const body = Onest({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-au-body",
  preload: false,
  adjustFontFallback: true,
});

const mono = IBM_Plex_Mono({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-au-mono",
  preload: false,
  adjustFontFallback: true,
});

const blank = { target: "_blank", rel: "noopener noreferrer" } as const;
const funnel = auditFunnelRows(new Set());
const formula = "Конверсия = число целевых действий / число визитов × 100%.";

const pins = [
  { id: "1", text: "Оффер не говорит, что вы продаёте", left: "44%", top: "15%" },
  { id: "2", text: "Две кнопки с равным весом", left: "46%", top: "34%", warn: true },
  { id: "3", text: "Картинка 2,4 МБ тормозит экран", left: "30%", top: "52%", warn: true },
  { id: "4", text: "4 поля в форме, телефон с маской-ловушкой", left: "44%", top: "72%" },
  { id: "5", text: "Нет цели «отправка формы» в Метрике", left: "20%", top: "88%", warn: true },
];

function Wireframe({ xray = false }: { xray?: boolean }) {
  return (
    <div className={`au-layer ${xray ? "au-xray" : "au-skin"}`} aria-hidden="true">
      <div className="au-wf">
        <div className="au-wf-nav">
          <span className="au-lg" />
          <span className="au-links">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="au-ttl">Лучшие решения для вашего бизнеса</div>
        <div className="au-sub" />
        <div className="au-sub au-sub-short" />
        <div className="au-ctaw">
          <span className="au-b1" />
          <span className="au-b2" />
        </div>
        <div className="au-img" />
        <div className="au-form">
          <i />
          <i />
          <i />
          <i />
          <i className="send" />
        </div>
      </div>
      {xray
        ? pins.map((pin) => (
            <div
              key={pin.id}
              className={pin.warn ? "au-pin w" : "au-pin"}
              style={{ left: pin.left, top: pin.top }}
              data-f={pin.id}
            >
              <i>{pin.id}</i>
              <span>{pin.text}</span>
            </div>
          ))
        : null}
    </div>
  );
}

function Answer({ text }: { text: string }) {
  if (!text.startsWith(formula)) {
    return <p>{text}</p>;
  }

  return (
    <p>
      <span className="au-formula">конверсия = целевые действия / визиты × 100%</span>
      <br />
      {text.slice(formula.length).trim()}
    </p>
  );
}

export function AuditLanding() {
  const year = new Date().getFullYear();

  return (
    <div
      id="au-root"
      className={`au ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <a className="au-skip" href="#au-main">
        К содержанию
      </a>
      <header className="au-header">
        <div className="au-wrap">
          <Link className="au-logo" href="/">
            web-dev<span>.su</span>
          </Link>
          <nav className="au-menu" aria-label="Разделы страницы">
            <a href="#leaks">Утечки</a>
            <a href="#deliverables">Что входит</a>
            <a href="#self-audit">Самопроверка</a>
            <a href="#prices">Цены</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="au-btn au-btn-main" href={profile.contacts.telegram.href} data-ev="cta-head" {...blank}>
            Заказать аудит
          </a>
        </div>
      </header>

      <aside className="au-hud" id="au-hud" aria-label="Демо-панель аудита">
        <div className="au-hud-head">
          <span className="au-rec">аудит визита · демо</span>
          <button className="au-hud-toggle" id="au-hud-min" type="button" aria-expanded="true">
            <span className="lbl-open">свернуть</span>
            <span className="lbl-shut">развернуть</span>
          </button>
        </div>
        <div className="au-hud-row">
          <div className="au-ring" id="au-ring" style={{ ["--p" as string]: 0 }}>
            <b>
              <span id="au-score">0</span>
              <small>/100</small>
            </b>
          </div>
          <dl>
            <div>
              <dt>Проверено блоков</dt>
              <dd>
                <span id="au-seen">0</span>/9
              </dd>
            </div>
            <div>
              <dt>Шанс заявки · демо</dt>
              <dd>
                <span id="au-cr">1,2</span>%<span className="d" id="au-crd" />
              </dd>
            </div>
          </dl>
        </div>
        <ul className="au-log" id="au-log" aria-live="polite">
          <li>сканер запущен · ждём действий</li>
        </ul>
        <p className="au-hud-note">
          Условная модель: так аналитик видел бы ваш визит. Это не статистика сайта.
        </p>
      </aside>

      <nav className="au-rail" aria-hidden="true">
        {auditSections.map((section, index) => (
          <a key={section.id} id={`au-rail-${index}`} href={`#${section.id}`}>
            <span>{section.label}</span>
            <i style={{ height: 8 + section.weight * 2 }} />
          </a>
        ))}
      </nav>

      <main className="au-main" id="au-main">
        <section className="au-section au-hero" id="hero" data-sec="Экран" data-w="4">
          <div className="au-wrap">
            <div className="au-hero-grid">
              <div>
                <p className="au-kicker">Услуга · аудит конверсии</p>
                <h1>
                  Анализ и аудит <em>конверсии</em> сайта
                </h1>
                <p className="au-lead">
                  Нахожу, на каком шаге сайт или лендинг теряет заявки: разбираю Метрику, вебвизор, воронку, формы, скорость и оффер. На выходе — список правок по приоритету, а не «сделаем редизайн».
                </p>
                <div className="au-cta">
                  <a className="au-btn au-btn-main" href={profile.contacts.telegram.href} data-ev="cta-hero" {...blank}>
                    Заказать аудит →
                  </a>
                  <a className="au-btn" href="#self-audit" data-ev="cta-self">
                    Проверить сайт самому
                  </a>
                </div>
                <div className="au-facts">
                  <div>
                    <b>после разбора</b>стоимость аудита
                  </div>
                  <div>
                    <b>Метрика + вебвизор</b>основа разбора
                  </div>
                  <div>
                    <b>P1 → P3</b>правки по приоритету
                  </div>
                </div>
              </div>
              <div className="au-scanner" aria-label="Демонстрация: рентген лендинга">
                <div className="au-scanner-bar">
                  <span className="au-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>
                    example-landing.ru · <span className="au-demo">пример</span>
                  </span>
                </div>
                <div className="au-stage" id="au-stage">
                  <Wireframe />
                  <Wireframe xray />
                  <div className="au-lens" aria-hidden="true" />
                </div>
                <div className="au-scan-foot">
                  <span>Наведите или проведите пальцем — рентген</span>
                  <span>
                    найдено <b id="au-pins">0</b>/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="leaks" data-sec="Утечки" data-w="10">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#leaks · воронка · 5 шагов</span>
              <p className="au-kicker">01 · где теряются заявки</p>
              <h2>Анализ конверсии сайта по шагам воронки</h2>
              <p className="au-lead">
                Конверсия сайта почти никогда не «плохая вообще». Обычно течёт один-два конкретных шага. Нажмите на шаг: покажу, что проверяю, и как изменится итог, если эту утечку закрыть.{" "}
                <span className="au-demo">демо-модель</span>
              </p>
              <div className="au-funnel" id="au-funnel">
                {funnel.rows.map((row) => {
                  const stage = auditStages[row.index];
                  return (
                    <div key={stage.name}>
                      <button
                        className="au-stage-row"
                        type="button"
                        data-i={row.index}
                        aria-expanded="false"
                      >
                        <span className="nm">
                          {row.index + 1}. {stage.name}
                          <small>{stage.step}</small>
                        </span>
                        <span className="au-bar">
                          <span className="au-keep" style={{ width: `${row.keepPct}%` }} />
                          <span
                            className="au-lost"
                            style={{ left: `${row.keepPct}%`, width: `${row.lostPct}%` }}
                          />
                        </span>
                        <span className="val">
                          <span className="v">{Math.round(row.now)} из 1000</span>
                          <small className="l">−{Math.round(row.before - row.now)} чел.</small>
                        </span>
                      </button>
                      <div className="au-drawer">
                        <div>
                          <div className="au-check-label">ЧТО ПРОВЕРЯЮ НА ЭТОМ ШАГЕ</div>
                          <ul>
                            {stage.checks.map((check) => (
                              <li key={check}>{check}</li>
                            ))}
                          </ul>
                        </div>
                        <button className="au-fix" type="button" data-i={row.index} aria-pressed="false">
                          закрыть утечку · демо
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="au-fsum" aria-live="polite">
                <span>Из 1 000 визитов до заявки доходят</span>
                <b id="au-fbase">
                  {Math.round(funnel.arrived)} чел. ({formatAudit(funnel.arrived / 10)}%)
                </b>
                <span className="ar" id="au-farrow">
                  нажмите на шаг воронки
                </span>
                <p>
                  Условные цифры для примера: показывают арифметику воронки, а не обещание результата. Реальные доли берём из вашей Метрики.
                </p>
              </div>
              <div className="au-finding">
                <b>находка</b>
                <span>
                  Если не знать, какой шаг течёт, правки делают «на глаз» — и чаще всего на первом экране, хотя заявки теряются в форме.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="deliverables" data-sec="Состав" data-w="9">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#deliverables · 7 пунктов отчёта</span>
              <p className="au-kicker">02 · что входит в аудит конверсии</p>
              <h2>Что вы получите после аудита</h2>
              <p className="au-lead">
                Аудит — это не презентация с общими советами. Каждая находка привязана к месту на сайте, данным и конкретной правке.
              </p>
              <div className="au-deliv">
                {auditDeliverables.map((item) => (
                  <article
                    key={item.title}
                    className={"wide" in item && item.wide ? "au-dcard wide" : "au-dcard"}
                    data-ev="deliv"
                    tabIndex={0}
                  >
                    <span className="au-chk">✓</span>
                    <span className="no">{item.no}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
              <div className="au-finding">
                <b>находка</b>
                <span>
                  Частая «проблема конверсии» на деле — неверно настроенные цели: заявки есть, но аналитика их не видит.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="report" data-sec="Отчёт" data-w="6">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#report · фрагмент отчёта</span>
              <p className="au-kicker">03 · как выглядит отчёт</p>
              <h2>Пример строк из отчёта аудита</h2>
              <p className="au-lead">
                Фрагмент условного отчёта по вымышленному лендингу <span className="au-demo">пример</span>
              </p>
              <div className="au-report" role="table" aria-label="Пример отчёта аудита">
                <div className="au-rrow" role="row">
                  <span role="columnheader">Приор.</span>
                  <span role="columnheader">Находка</span>
                  <span role="columnheader">Где</span>
                  <span role="columnheader">Что сделать</span>
                  <span role="columnheader">Сложность</span>
                </div>
                {auditReportRows.map((row) => (
                  <div className="au-rrow" role="row" data-ev="row" key={row.finding}>
                    <span role="cell">
                      <span className={`au-prio au-${row.level}`}>{row.priority}</span>
                    </span>
                    <span role="cell">{row.finding}</span>
                    <span className="au-where" role="cell">{row.where}</span>
                    <span className="au-todo" role="cell">{row.todo}</span>
                    <span className="au-effort" role="cell">{row.effort}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="self-audit" data-sec="Тест" data-w="12">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#self-audit · 8 вопросов</span>
              <p className="au-kicker">04 · самопроверка за минуту</p>
              <h2>Проверьте конверсию своего сайта сами</h2>
              <p className="au-lead">
                Восемь вопросов, которые я задаю в начале любого аудита. Ответьте честно — появится демо-оценка и что проверить в первую очередь.
              </p>
              <div className="au-quiz-grid">
                <div className="au-qlist">
                  {auditQuestions.map((question, index) => (
                    <div className="au-q" data-i={index} key={question.prompt}>
                      <span>{question.prompt}</span>
                      <span className="au-yn" role="group" aria-label="Ответ">
                        <button className="y" type="button" data-yes="true" aria-pressed="false">
                          да
                        </button>
                        <button className="n" type="button" data-yes="false" aria-pressed="false">
                          нет
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="au-result" aria-live="polite">
                  <div className="au-result-kicker">
                    Готовность к заявкам <span className="au-demo">демо</span>
                  </div>
                  <div className="au-big">
                    <b id="au-qscore">—</b>
                    <span id="au-qmeta">ответьте хотя бы на 1 вопрос</span>
                  </div>
                  <div className="au-meter">
                    <i id="au-qmeter" />
                  </div>
                  <h3>Что проверить первым</h3>
                  <ol className="au-recs" id="au-recs">
                    <li>Здесь появятся рекомендации по вашим ответам.</li>
                  </ol>
                  <p className="au-hint">
                    Оценка условная и считается только в вашем браузере. Это не замена аудиту: без данных Метрики нельзя сказать, где именно теряются люди.
                  </p>
                  <a className="au-btn au-btn-main" href={profile.contacts.telegram.href} data-ev="cta-quiz" {...blank}>
                    Разобрать мой сайт →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="process" data-sec="Процесс" data-w="5">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#process · 4 шага</span>
              <p className="au-kicker">05 · как идёт работа</p>
              <h2>Как проходит аудит конверсии лендинга</h2>
              <div className="au-steps">
                {auditProcess.map((step) => (
                  <div className="au-step" key={step.n}>
                    <span className="n">{step.n}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="prices" data-sec="Цены" data-w="10">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#prices · аудит + внедрение</span>
              <p className="au-kicker">06 · цены</p>
              <h2>Сколько стоит аудит и правки по нему</h2>
              <div className="au-svc-grid">
                <div className="au-audit-card">
                  <h3>Аудит конверсии</h3>
                  <div className="au-price">
                    после разбора задачи
                    <small>зависит от числа страниц, сценариев и данных в аналитике</small>
                  </div>
                  <ul>
                    <li>Сайт, лендинг или квиз</li>
                    <li>Метрика, вебвизор, воронка, формы, скорость, оффер</li>
                    <li>Список правок по приоритету P1–P3</li>
                  </ul>
                  <a className="au-btn au-btn-main" href={profile.contacts.telegram.href} data-ev="cta-price" {...blank}>
                    Обсудить аудит →
                  </a>
                </div>
                <div className="au-plist">
                  <div className="au-cap">Если правки нужно сделать</div>
                  <Link className="au-prow" href={servicePath("booking-sites")} data-ev="price">
                    <span>
                      <b>Мини-сайт или лендинг</b>
                      <small>новая версия страниц по итогам аудита</small>
                    </span>
                    <span className="au-pr">
                      от 10 000 ₽<small>за уникальную страницу · от 2 дней</small>
                    </span>
                  </Link>
                  <Link className="au-prow" href={servicePath("telegram-bots")} data-ev="price">
                    <span>
                      <b>Telegram-бот для заявок</b>
                      <small>меню, сбор заявки, отправка в Telegram</small>
                    </span>
                    <span className="au-pr">
                      от 10 000 ₽<small>3–5 дней</small>
                    </span>
                  </Link>
                  <Link className="au-prow" href={servicePath("web-apps")} data-ev="price">
                    <span>
                      <b>Веб-приложения и кабинеты</b>
                      <small>экраны записи, оплаты, личный кабинет</small>
                    </span>
                    <span className="au-pr">
                      от 10 000 ₽<small>за экран / страницу</small>
                    </span>
                  </Link>
                  <Link className="au-prow" href={servicePath("integrations")} data-ev="price">
                    <span>
                      <b>Интеграции</b>
                      <small>Битрикс, amoCRM, ЮKassa, Tilda, интернет-эквайринг</small>
                    </span>
                    <span className="au-pr">
                      после разбора<small>задачи</small>
                    </span>
                  </Link>
                </div>
              </div>
              <p className="au-lead">
                Хотите не только найти, но и поднять конверсию? Смотрите страницу{" "}
                <Link href={servicePath(CONVERSION_SERVICE_ID)}>«Повышение конверсии сайта и лендинга»</Link>
                . Если заявки удобнее собирать вопросами —{" "}
                <Link href={servicePath(QUIZ_SERVICE_ID)}>квиз для сайта</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="au-section" id="cases" data-sec="Кейсы" data-w="6">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#cases · 5 проектов</span>
              <p className="au-kicker">07 · опыт</p>
              <h2>Над чем я работал</h2>
              <div className="au-cases">
                {auditCases.map((item) => (
                  <Link className="au-case" href={item.href} data-ev="case" key={item.href}>
                    <span className="role">{item.role}</span>
                    {"concept" in item && item.concept ? <span className="au-cpt">концепт</span> : null}
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <span className="go">читать кейс →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="faq" data-sec="FAQ" data-w="8">
          <div className="au-wrap">
            <div className="au-sec">
              <span className="au-tag">section#faq · 9 вопросов</span>
              <p className="au-kicker">08 · вопросы</p>
              <h2>Вопросы про анализ конверсии</h2>
              <div className="au-faq">
                {auditFaq.map((item) => (
                  <details key={item.question}>
                    <summary data-ev="faq">{item.question}</summary>
                    <Answer text={item.answer} />
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="au-section" id="contact" data-sec="Контакт" data-w="12">
          <div className="au-wrap">
            <div className="au-final">
              <div>
                <p className="au-kicker">09 · следующий шаг</p>
                <h2>Пришлите ссылку на сайт — скажу, с чего начать аудит</h2>
                <p className="au-lead">
                  Напишите в Telegram: адрес сайта, что считается заявкой и откуда трафик. Отвечу, какие данные нужны и сколько это будет стоить.
                </p>
              </div>
              <div className="au-links">
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

      <footer className="au-footer">
        <div className="au-wrap">
          <span>
            © {year} {profile.name} · web-dev.su
          </span>
          <span>Панель аудита и цифры на странице — демо-модель, не статистика</span>
          <nav aria-label="Ещё на сайте">
            <Link href="/">Главная</Link>
            <Link href="/services">Все услуги</Link>
            <Link href={servicePath(CONVERSION_SERVICE_ID)}>Повышение конверсии</Link>
            <Link href={servicePath(QUIZ_SERVICE_ID)}>Квиз для сайта</Link>
          </nav>
        </div>
      </footer>
      <AuditLoader />
    </div>
  );
}
