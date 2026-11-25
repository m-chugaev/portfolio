import Link from "next/link";
import "@fontsource/unbounded/700.css";
import "@fontsource/unbounded/800.css";
import "@fontsource/unbounded/cyrillic-700.css";
import "@fontsource/unbounded/cyrillic-800.css";
import "@fontsource/golos-text/400.css";
import "@fontsource/golos-text/500.css";
import "@fontsource/golos-text/600.css";
import "@fontsource/golos-text/cyrillic-400.css";
import "@fontsource/golos-text/cyrillic-500.css";
import "@fontsource/golos-text/cyrillic-600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/cyrillic-400.css";
import "@fontsource/jetbrains-mono/cyrillic-500.css";
import "@fontsource/jetbrains-mono/cyrillic-600.css";
import { profile } from "@/data/profile";
import {
  answerParts,
  blockMetrics,
  calculatorDefaults,
  conversionCases,
  conversionRate,
  formatDemo,
  funnelServices,
  funnelSteps,
  FUNNEL_MAX,
  leadWord,
  priceRows,
  processSteps,
  projectedLeads,
} from "@/data/conversion";
import { CONVERSION_SERVICE_ID, getServiceById, SERVICES_INDEX_PATH } from "@/data/services";
import { AnalyticsLoader } from "./AnalyticsLoader";
import "./conversion.css";

const metricById = Object.fromEntries(
  blockMetrics.map((metric) => [metric.id, metric]),
) as Record<(typeof blockMetrics)[number]["id"], (typeof blockMetrics)[number]>;

function Metric({ id }: { id: (typeof blockMetrics)[number]["id"] }) {
  const metric = metricById[id];

  return (
    <span
      className={metric.floating ? "cv-metric cv-metric-float" : "cv-metric"}
      data-metric={metric.id}
      data-base={metric.base}
    >
      <span className="cv-dot" />
      <small>{metric.label}</small>
      <span className="cv-v">{formatDemo(metric.base)}</span>
      <span className="cv-d" />
    </span>
  );
}

function SectionHeading({
  id,
  kicker,
  title,
  text,
  titleClassName = "cv-title",
}: {
  id: string;
  kicker: string;
  title: string;
  text?: string;
  titleClassName?: string;
}) {
  return (
    <div>
      <h2 id={id}>
        <span className="cv-kicker">{kicker}</span>
        <span className={titleClassName}>{title}</span>
      </h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function ConversionLanding() {
  const service = getServiceById(CONVERSION_SERVICE_ID);
  const year = new Date().getFullYear();
  const initialRate = conversionRate(
    calculatorDefaults.leads,
    calculatorDefaults.visits,
  );
  const initialProjected = projectedLeads(
    calculatorDefaults.visits,
    calculatorDefaults.whatIf,
  );
  const startChance = funnelSteps.find((step) => step.done)?.weight ?? 3;

  if (!service) {
    return null;
  }

  return (
    <div
      id="cv-root"
      className="cv"
    >
      <a className="cv-skip" href="#cv-main">
        К содержанию
      </a>
      <canvas className="cv-heat" id="cv-heat" aria-hidden="true" />
      <div className="cv-grain" aria-hidden="true" />
      <div className="cv-cursors" id="cv-cursors" aria-hidden="true" />
      <div className="cv-ruler" aria-hidden="true">
        <i id="cv-ruler-tag" style={{ top: "0%" }} title="доля посетителей, доскролливших до этого места (демо)">
          100% · демо
        </i>
      </div>

      <header className="cv-header">
        <div className="cv-wrap">
          <Link className="cv-logo" href="/">
            <b>МЧ</b>
            <span className="cv-logo-name">{profile.name}</span>
          </Link>
          <nav className="cv-nav" aria-label="Разделы страницы">
            <a href="#calc">Калькулятор</a>
            <a href="#services">Услуги</a>
            <a href="#cases">Кейсы</a>
            <a href="#prices">Цены</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="cv-btn cv-btn-hot" href="#contact" data-hot="cta" data-ev="cta-header">
            Обсудить проект
          </a>
        </div>
      </header>

      <main className="cv-main" id="cv-main">
        <section className="cv-hero" data-block="hero" aria-labelledby="cv-h1">
          <div className="cv-wrap cv-hero-grid">
            <div>
              <div className="cv-eyebrow">
                <span className="cv-live">демо-аналитика</span>
                Сайты, боты и интеграции, которые не теряют заявки
              </div>
              <h1 id="cv-h1">
                Повышение <em>конверсии</em> сайта и&nbsp;лендинга
              </h1>
              <p className="cv-lead">
                Разбираю, где посетитель уходит, и убираю это место: понятный первый экран, запись в пару касаний, заявки сразу в Telegram или CRM. Этот сайт показывает механику: каждое ваше действие здесь отражается в карточке «Ваш путь по воронке».
              </p>
              <div className="cv-hero-row">
                <a className="cv-btn cv-btn-hot" href="#calc" data-hot="cta" data-ev="cta-hero">
                  Посчитать конверсию
                </a>
                <a className="cv-btn cv-btn-ghost" href="#cases" data-hot="cta" data-ev="cta-cases">
                  Смотреть кейсы
                </a>
                <Metric id="hero" />
              </div>
            </div>
            <aside className="cv-funnel" aria-labelledby="cv-funnel-title">
              <h2 id="cv-funnel-title">Ваш путь по воронке</h2>
              <p className="cv-note">
                Демо: так ваш визит выглядел бы в аналитике. Цифры условные, это не статистика сайта.
              </p>
              <div className="cv-big">
                <b id="cv-prob">{startChance}%</b>
                <span>шанс заявки по демо-модели</span>
              </div>
              <div className="cv-bar" aria-hidden="true">
                <i id="cv-prob-bar" style={{ width: `${(startChance / FUNNEL_MAX) * 100}%` }} />
              </div>
              <ol className="cv-steps" id="cv-steps">
                {funnelSteps.map((step) => (
                  <li
                    key={step.id}
                    data-step={step.id}
                    className={step.done ? "is-done" : undefined}
                  >
                    {step.label} <b>+{step.weight}</b>
                  </li>
                ))}
              </ol>
              <p className="cv-sr" id="cv-live" aria-live="polite" />
            </aside>
          </div>
        </section>

        <section className="cv-section" id="calc" data-block="calc" aria-labelledby="cv-calc-title">
          <div className="cv-wrap">
            <div className="cv-sec-head">
              <SectionHeading
                id="cv-calc-title"
                kicker="01 / Как посчитать конверсию сайта"
                title="Конверсия сайта — это доля визитов, которые закончились заявкой"
                text="Формула простая: заявки делим на визиты и умножаем на 100%. Введите свои цифры из Метрики за месяц."
              />
              <Metric id="calc" />
            </div>
            <div className="cv-calc">
              <div className="cv-calc-in">
                <label>
                  Визиты за месяц
                  <input
                    id="cv-visits"
                    type="number"
                    min={1}
                    defaultValue={calculatorDefaults.visits}
                    inputMode="numeric"
                    autoComplete="off"
                  />
                </label>
                <label>
                  Заявки за месяц
                  <input
                    id="cv-leads"
                    type="number"
                    min={0}
                    defaultValue={calculatorDefaults.leads}
                    inputMode="numeric"
                    autoComplete="off"
                  />
                </label>
                <label>
                  Что если конверсия станет{" "}
                  <output id="cv-what-out" htmlFor="cv-what">
                    {formatDemo(calculatorDefaults.whatIf)}
                  </output>
                  <input
                    id="cv-what"
                    type="range"
                    min={0.2}
                    max={10}
                    step={0.1}
                    defaultValue={calculatorDefaults.whatIf}
                  />
                </label>
              </div>
              <div className="cv-calc-out" aria-live="polite" aria-atomic="true">
                <div>
                  <div className="cv-formula">CR = заявки / визиты × 100%</div>
                  <div className="cv-cr" id="cv-cr">
                    {formatDemo(initialRate)}
                  </div>
                </div>
                <p className="cv-what" id="cv-what-txt">
                  При том же трафике это{" "}
                  <b id="cv-what-count">
                    {initialProjected} {leadWord(initialProjected)}
                  </b>{" "}
                  в месяц вместо <span id="cv-what-base">{calculatorDefaults.leads}</span>. Это арифметика, а не обещание: реальный результат зависит от ниши и трафика.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cv-section" id="services" data-block="services" aria-labelledby="cv-services-title">
          <div className="cv-wrap">
            <div className="cv-sec-head">
              <SectionHeading
                id="cv-services-title"
                kicker="02 / Способы увеличения конверсии"
                title="Где теряются заявки и чем я это закрываю"
                text="Конверсия падает не только из-за дизайна: заявка застревает в директе, форма неудобная, менеджер переносит данные руками. Четыре услуги закрывают разные места воронки."
              />
              <Metric id="services" />
            </div>
            <div className="cv-grid4">
              {funnelServices.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="cv-svc"
                  data-hot="card"
                  data-ev="svc"
                >
                  <span className="cv-mark">{item.mark}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="cv-why">{item.step}</div>
                  <div className="cv-price">
                    {item.price}
                    <small>{item.note}</small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="cv-section" id="cases" data-block="cases" aria-labelledby="cv-cases-title">
          <div className="cv-wrap">
            <div className="cv-sec-head">
              <SectionHeading
                id="cv-cases-title"
                kicker="03 / Кейсы"
                title="Над чем я работал"
                text="Роль, стек и то, что можно рассказать публично. Раскройте кейс и посмотрите, как меняется бейдж."
              />
              <Metric id="cases" />
            </div>
            <div className="cv-cases">
              {conversionCases.map((item) => (
                <details key={item.id} className="cv-case" data-hot="card">
                  <summary data-ev="case">
                    <span className="cv-role">
                      {item.role}
                      <br />
                      {item.year}
                    </span>
                    <div>
                      <h3>
                        {item.title}
                        {item.concept ? (
                          <>
                            {" "}
                            <span className="cv-concept">концепт</span>
                          </>
                        ) : null}
                      </h3>
                      <p className="cv-sub">{item.subtitle}</p>
                    </div>
                    <span className="cv-plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="cv-case-body">
                    <div>
                      <p>{item.body}</p>
                      <div className="cv-tags">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <Link className="cv-btn cv-btn-ghost" href={item.href} data-ev="case-read">
                      Читать кейс
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cv-section" id="process" data-block="process" aria-labelledby="cv-process-title">
          <div className="cv-wrap">
            <div className="cv-sec-head">
              <SectionHeading
                id="cv-process-title"
                kicker="04 / Анализ конверсии сайта"
                title="Как идёт работа"
                text="Сначала смотрим, где ломается путь клиента, и только потом пишем код."
              />
              <Metric id="process" />
            </div>
            <div className="cv-proc">
              {processSteps.map((step) => (
                <div key={step.index}>
                  <span className="cv-proc-index" aria-hidden="true">
                    {step.index}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cv-section" id="prices" data-block="prices" aria-labelledby="cv-prices-title">
          <div className="cv-wrap">
            <div className="cv-sec-head">
              <SectionHeading
                id="cv-prices-title"
                kicker="05 / Стоимость"
                title="Цены «от» и сроки"
                text="«От» — нижняя граница согласованного состава, а не пакет под ключ. Итог и календарь — после разбора задачи. Аудит конверсии на этой странице — тоже после разбора, публичной цены нет."
              />
              <Metric id="prices" />
            </div>
            <div className="cv-prices" role="table" aria-label="Цены и сроки">
              <div className="cv-prow cv-prow-head" role="row">
                <span role="columnheader">Услуга</span>
                <span role="columnheader">Цена</span>
                <span role="columnheader">Срок</span>
              </div>
              {priceRows.map((row) => (
                <div key={row.id} className="cv-prow" role="row" data-hot="card">
                  <span role="cell">
                    {row.href ? (
                      <Link href={row.href}>
                        <b>{row.name}</b>
                      </Link>
                    ) : (
                      <b>{row.name}</b>
                    )}
                  </span>
                  <span role="cell">
                    <b>{row.price}</b>
                    {row.priceSuffix}
                  </span>
                  <span role="cell">{row.term}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cv-section" id="faq" data-block="faq" aria-labelledby="cv-faq-title">
          <div className="cv-wrap">
            <div className="cv-sec-head">
              <SectionHeading
                id="cv-faq-title"
                kicker="06 / Частые вопросы"
                title="Про конверсию сайта"
              />
              <Metric id="faq" />
            </div>
            <div className="cv-faq">
              {service.faq.map((item) => (
                <details key={item.question} data-hot="card">
                  <summary data-ev="faq">{item.question}</summary>
                  <p>
                    {answerParts(item.answer).map((part) =>
                      part.placeholder ? (
                        <span key={part.text} className="cv-ph">
                          {part.text}
                        </span>
                      ) : (
                        part.text
                      ),
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cv-section" id="contact" data-block="contact" aria-labelledby="cv-contact-title">
          <div className="cv-wrap">
            <div className="cv-cta">
              <Metric id="contact" />
              <div>
                <SectionHeading
                  id="cv-contact-title"
                  kicker="07 / Последний шаг воронки"
                  title="Покажите, где у вас теряются заявки"
                  titleClassName="cv-title cv-title-xl"
                />
                <p>
                  Напишите в Telegram, как сейчас клиент доходит до заявки. Разберу путь и предложу, что упростить. Если задача не моя — так и скажу.
                </p>
                <a
                  className="cv-btn cv-btn-hot"
                  href={profile.contacts.telegram.href}
                  data-hot="cta"
                  data-ev="cta-final"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Написать в Telegram
                </a>
              </div>
              <div className="cv-links">
                <a
                  href={profile.contacts.telegram.href}
                  data-ev="cta-final"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Telegram</span>
                  <span>{profile.contacts.telegram.label} →</span>
                </a>
                <a href={profile.contacts.email.href} data-ev="cta-final">
                  <span>Email</span>
                  <span>{profile.contacts.email.label} →</span>
                </a>
                <a
                  href={profile.contacts.habr.href}
                  data-ev="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Профиль</span>
                  <span>{profile.contacts.habr.label} →</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="cv-footer">
        <div className="cv-wrap cv-foot">
          <span>
            © {year} {profile.name} · web-dev.su
          </span>
          <span>Heatmap, курсоры и проценты на странице — демонстрация, а не реальные данные.</span>
          <nav aria-label="Ещё на сайте">
            <Link href="/">Главная</Link>
            <Link href={SERVICES_INDEX_PATH}>Все услуги</Link>
          </nav>
        </div>
      </footer>

      <div className="cv-hud" role="group" aria-label="Слои демо-аналитики">
        <span className="cv-hud-label">Слои:</span>
        <button type="button" aria-pressed="true" data-layer="heat">
          Heatmap
        </button>
        <button type="button" aria-pressed="true" data-layer="cur">
          Курсоры
        </button>
        <button type="button" aria-pressed="true" data-layer="metrics">
          Метрики
        </button>
        <span className="cv-pct">
          <span className="cv-sr">Шанс заявки по демо-модели</span>
          <span id="cv-hud-pct">{startChance}%</span>
        </span>
      </div>
      <AnalyticsLoader />
    </div>
  );
}
