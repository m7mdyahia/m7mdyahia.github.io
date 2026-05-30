---
title: Removing Tashkel
description: Removing Arabic tasjkeel for better search using Unicode categories
date: 2017-02-23
tags: [Full_Text_Search, Arabic_NLP]
---

بسم الله الرحمن الرحيم

## Introduction

The modern way for representing text characters is unicode (contrary to the old charsets), most modern programming languages and database systems support Unicode natively now.

Sticking to the standard is the best practice to maintain portability and continuous improvement. So using the Unicode category is better than using manual functions.

Each unicode character is assigned a category. The arabic tashkeel characters are defined in the ['Mark, Nonspacing' category](http://www.fileformat.info/info/unicode/category/Mn/index.htm) (Mn).

### Update:

A better way would be to leave only the letters in the {Lo} category which contains the basic arabic language.

Also leave spaces, tabs and newlines:

```
[^\p{Lo}\p{Z}\n]
```

## Arabic characters in the Mark, Nonspacing

| Unicode | Name | Character | Preview |
|---------|------|-----------|---------|
| U+0610 | ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM | ؐ | [view](http://www.fileformat.info/info/unicode/char/0610/arabic_sign_sallallahou_alayhe_wassallam.png) |
| U+0611 | ARABIC SIGN ALAYHE ASSALLAM | ؑ | [view](http://www.fileformat.info/info/unicode/char/0611/arabic_sign_alayhe_assallam.png) |
| U+0612 | ARABIC SIGN RAHMATULLAH ALAYHE | ؒ | [view](http://www.fileformat.info/info/unicode/char/0612/arabic_sign_rahmatullah_alayhe.png) |
| U+0613 | ARABIC SIGN RADI ALLAHOU ANHU | ؓ | [view](http://www.fileformat.info/info/unicode/char/0613/arabic_sign_radi_allahou_anhu.png) |
| U+0614 | ARABIC SIGN TAKHALLUS | ؔ | [view](http://www.fileformat.info/info/unicode/char/0614/arabic_sign_takhallus.png) |
| U+0615 | ARABIC SMALL HIGH TAH | ؕ | [view](http://www.fileformat.info/info/unicode/char/0615/arabic_small_high_tah.png) |
| U+0616 | ARABIC SMALL HIGH LIGATURE ALEF WITH LAM WITH YEH | ؖ | [view](http://www.fileformat.info/info/unicode/char/0616/arabic_small_high_ligature_alef_with_lam_with_yeh.png) |
| U+0617 | ARABIC SMALL HIGH ZAIN | ؗ | [view](http://www.fileformat.info/info/unicode/char/0617/arabic_small_high_zain.png) |
| U+0618 | ARABIC SMALL FATHA | ؘ | [view](http://www.fileformat.info/info/unicode/char/0618/arabic_small_fatha.png) |
| U+0619 | ARABIC SMALL DAMMA | ؙ | [view](http://www.fileformat.info/info/unicode/char/0619/arabic_small_damma.png) |
| U+061A | ARABIC SMALL KASRA | ؚ | [view](http://www.fileformat.info/info/unicode/char/061a/arabic_small_kasra.png) |
| U+064B | ARABIC FATHATAN | ً | [view](http://www.fileformat.info/info/unicode/char/064b/arabic_fathatan.png) |
| U+064C | ARABIC DAMMATAN | ٌ | [view](http://www.fileformat.info/info/unicode/char/064c/arabic_dammatan.png) |
| U+064D | ARABIC KASRATAN | ٍ | [view](http://www.fileformat.info/info/unicode/char/064d/arabic_kasratan.png) |
| U+064E | ARABIC FATHA | َ | [view](http://www.fileformat.info/info/unicode/char/064e/arabic_fatha.png) |
| U+064F | ARABIC DAMMA | ُ | [view](http://www.fileformat.info/info/unicode/char/064f/arabic_damma.png) |
| U+0650 | ARABIC KASRA | ِ | [view](http://www.fileformat.info/info/unicode/char/0650/arabic_kasra.png) |
| U+0651 | ARABIC SHADDA | ّ | [view](http://www.fileformat.info/info/unicode/char/0651/arabic_shadda.png) |
| U+0652 | ARABIC SUKUN | ْ | [view](http://www.fileformat.info/info/unicode/char/0652/arabic_sukun.png) |
| U+0653 | ARABIC MADDAH ABOVE | ٓ | [view](http://www.fileformat.info/info/unicode/char/0653/arabic_maddah_above.png) |
| U+0654 | ARABIC HAMZA ABOVE | ٔ | [view](http://www.fileformat.info/info/unicode/char/0654/arabic_hamza_above.png) |
| U+0655 | ARABIC HAMZA BELOW | ٕ | [view](http://www.fileformat.info/info/unicode/char/0655/arabic_hamza_below.png) |
| U+0656 | ARABIC SUBSCRIPT ALEF | ٖ | [view](http://www.fileformat.info/info/unicode/char/0656/arabic_subscript_alef.png) |
| U+0657 | ARABIC INVERTED DAMMA | ٗ | [view](http://www.fileformat.info/info/unicode/char/0657/arabic_inverted_damma.png) |
| U+0658 | ARABIC MARK NOON GHUNNA | ٘ | [view](http://www.fileformat.info/info/unicode/char/0658/arabic_mark_noon_ghunna.png) |
| U+0659 | ARABIC ZWARAKAY | ٙ | [view](http://www.fileformat.info/info/unicode/char/0659/arabic_zwarakay.png) |
| U+065A | ARABIC VOWEL SIGN SMALL V ABOVE | ٚ | [view](http://www.fileformat.info/info/unicode/char/065a/arabic_vowel_sign_small_v_above.png) |
| U+065B | ARABIC VOWEL SIGN INVERTED SMALL V ABOVE | ٛ | [view](http://www.fileformat.info/info/unicode/char/065b/arabic_vowel_sign_inverted_small_v_above.png) |
| U+065C | ARABIC VOWEL SIGN DOT BELOW | ٜ | [view](http://www.fileformat.info/info/unicode/char/065c/arabic_vowel_sign_dot_below.png) |
| U+065D | ARABIC REVERSED DAMMA | ٝ | [view](http://www.fileformat.info/info/unicode/char/065d/arabic_reversed_damma.png) |
| U+065E | ARABIC FATHA WITH TWO DOTS | ٞ | [view](http://www.fileformat.info/info/unicode/char/065e/arabic_fatha_with_two_dots.png) |
| U+065F | ARABIC WAVY HAMZA BELOW | ٟ | [view](http://www.fileformat.info/info/unicode/char/065f/arabic_wavy_hamza_below.png) |
| U+0670 | ARABIC LETTER SUPERSCRIPT ALEF | ٰ | [view](http://www.fileformat.info/info/unicode/char/0670/arabic_letter_superscript_alef.png) |
| U+06D6 | ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA | ۖ | [view](http://www.fileformat.info/info/unicode/char/06d6/arabic_small_high_ligature_sad_with_lam_with_alef_maksura.png) |

