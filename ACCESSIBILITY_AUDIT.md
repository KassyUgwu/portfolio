# Accessibility review record

Reviewed 13 October 2026. This is an implementation and automated review, not a completed WCAG 2.1 AA conformance audit.

## Checked

- `e2e/smoke.spec.ts` runs axe-core on Home, Work, every case study, About, Résumé, and 404, in light and dark themes, under Chromium, Firefox, and WebKit. The mobile menu is scanned in both themes. The latest local suite found no automated violations.
- Browser tests check skip-link focus, menu opening and Escape focus return, 200% text, enlarged text spacing, no-JavaScript content and navigation, and failed-image navigation.
- The résumé has a structured HTML route at `/resume`, with the original PDF offered as a download. The PDF itself is untagged, so visitors should use the HTML version for accessible reading.
- Home and Work content does not depend on scroll-triggered animation. The header mark makes one short orbit on load and moves while hovered or focused. Reduced-motion settings disable the orbit; the remaining About reveal is finite.

## Still to check with a person

1. Navigate every route with a keyboard, including external project links and the PDF download, on actual browsers and devices.
2. Read Home cards, About sections, case studies, and the mobile dialog with VoiceOver and NVDA or another screen reader. Check reading order and announced names.
3. Measure text and interactive-state contrast in both themes, including hover/focus states and any image overlays.
4. Review every applicable WCAG 2.1 AA success criterion and record pass/fail evidence. Automated checks cover only part of the standard.

Do not describe this site as WCAG 2.1 AA compliant until those checks are completed and documented.
