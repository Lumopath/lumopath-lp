"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import Badge from "../Badge";
import Button from "../Button";
import { initSignalAnimation } from "./anim";
import { BG_MESSAGES, FG_MESSAGES } from "./constants";
import s from "./Signal.module.scss";
import MarkdownText from "../MarkdownText";

// ─── Reusable message card ───────────────────────────────────────

const SignalMessage = ({ icon, title, children, className, ...rest }) => (
  <div className={clsx(s.message, className)} {...rest}>
    {icon && (
      <div className={s.message_icon}>
        <Image
          src={icon.src}
          alt={icon.alt || ""}
          width={icon.width || 32}
          height={icon.height || 32}
        />
      </div>
    )}
    <div className={s.message_body}>
      {title && <strong className={s.message_title}>{title}</strong>}
      {children}
    </div>
  </div>
);

// ─── Center Lumopath summary card ────────────────────────────────

const SUMMARY_MEMBERS = [
  { name: "Clark", effort: "72h effort", color: "#ef4444" },
  { name: "Daniel", effort: "18h effort", color: "#22c55e" },
];

const SignalSummaryCard = ({ className, ...rest }) => (
  <div className={clsx(s.summaryCard, className)} {...rest}>
    <div className={s.summaryCard_inner}>
      <div className={s.summaryCard_header}>
        <strong className={s.summaryCard_title}>Client: Acme Corp</strong>
        <span className={s.summaryCard_subtitle}>Topic: User Migration</span>
      </div>
      <div className={s.summaryCard_cells}>
        {SUMMARY_MEMBERS.map((member) => (
          <div key={member.name} className={s.summaryCard_cell}>
            <span
              className={s.summaryCard_dot}
              style={{ backgroundColor: member.color }}
            />
            <strong className={s.summaryCard_name}>{member.name}</strong>
            <span className={s.summaryCard_value}>{member.effort}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const renderForegroundContent = (type) => {
  if (type === "jira") {
    return (
      <>
        <p className={s.message_text}>
          <span className={s.message_mention}>@Daniel</span> created a task{" "}
          <strong>Acme User Migration.</strong>
        </p>
        <div className={s.message_meta}>
          <span>
            Assignee: <strong>Clark</strong>
          </span>
          <span>
            Status: <strong>To Do</strong>
          </span>
          <span className={s.message_metaPriority}>
            Priority: <strong>High</strong>
          </span>
        </div>
      </>
    );
  }

  if (type === "slack") {
    return (
      <>
        <div className={s.message_header}>
          <strong className={s.message_title}>Clark</strong>
          <span className={s.message_time}>2:43 PM</span>
        </div>
        <p className={s.message_slackText}>
          Hi team, Acme asked if we can prioritize migrating the remaining
          accounts. What a realistic timeline looks like?
        </p>
        <div className={s.message_thread}>
          <div className={s.message_threadAvatars}>
            <Image
              src="/images/signal/avatar-1.jpg"
              alt=""
              width={24}
              height={24}
              className={s.message_threadAvatar}
            />
            <Image
              src="/images/signal/avatar-2.jpg"
              alt=""
              width={24}
              height={24}
              className={s.message_threadAvatar}
            />
          </div>
          <span className={s.message_threadCount}>4 replies</span>
          <span className={s.message_threadLink}>View thread</span>
        </div>
      </>
    );
  }

  if (type === "zoom") {
    return (
      <div className={s.message_details}>
        <span>Meeting ID: 927 9156 2648</span>
        <span>Time: Apr 26, 3pm-4pm UTC</span>
      </div>
    );
  }

  if (type === "gmail") {
    return (
      <p className={clsx(s.message_text, s.message_textClamp)}>
        {
          "We’re hoping to complete onboarding before the end of the quarter. Could you provide more..."
        }
      </p>
    );
  }

  return null;
};

// ─── Signal section ──────────────────────────────────────────────

const Signal = ({
  heading,
  label,
  subHeading,
  description,
  summary,
  ctaLabel,
}) => {
  const animRef = useRef(null);

  useEffect(() => {
    if (!animRef.current) return;
    const tl = initSignalAnimation(animRef.current);
    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, []);

  return (
    <section className={clsx("container", s.signal)}>
      <h2 data-aos="fade-up">
        <MarkdownText
          components={{
            p: ({ children }) => <>{children}</>,
            em: ({ children }) => (
              <span className={s.heading_full}>{children}</span>
            ),
            strong: ({ children }) => (
              <span className={s.heading_short}>{children}</span>
            ),
          }}
        >
          {heading}
        </MarkdownText>
      </h2>

      <div className={s.process}>
        <div className={s.moment}>
          <Badge variant="blue" data-aos="fade-up">
            {label}
          </Badge>
          <h4
            className={s.moment_title}
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
              {subHeading}
            </MarkdownText>
          </h4>
          <p className={s.moment_descr} data-aos="fade-up" data-aos-delay={200}>
            <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
              {description}
            </MarkdownText>
          </p>
        </div>

        <div ref={animRef} className={s.animation}>
          {BG_MESSAGES.map((msg) => (
            <SignalMessage
              key={msg.id}
              data-signal-bg=""
              className={clsx(s.card, s.card__bg, s[`card__${msg.id}`])}
              icon={msg.icon}
              title={msg.title}
            >
              <p className={s.message_text}>{msg.text}</p>
            </SignalMessage>
          ))}

          <div className={s.animation_overlay} />

          {FG_MESSAGES.map((msg) => (
            <SignalMessage
              key={msg.id}
              data-signal-fg=""
              className={clsx(s.card, s[`card__${msg.id}`])}
              icon={msg.icon}
              title={msg.title}
            >
              {renderForegroundContent(msg.type)}
            </SignalMessage>
          ))}

          <SignalSummaryCard
            data-signal-summary=""
            className={clsx(s.card, s.card__center)}
          />
        </div>

        <div className={s.closing} data-aos="fade-up">
          <h5 className={s.closing_text}>
            <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
              {summary}
            </MarkdownText>
          </h5>
          <Button variant="primary" href="#popup">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Signal;
