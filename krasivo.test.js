const krasivo = require('./krasivo')

describe('krasivo', () => {
  it('works with English symbols', () => {
    expect(
      krasivo('lol', 'x', '~')
    ).toBe(
      [
        'x~~~~~~xxx~~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'xxxxx~~xxx~~xxxxx'
      ].join('\n')
    )
  })

  it('works with Russian symbols', () => {
    expect(
      krasivo('лол', 'x', '~')
    ).toBe(
      [
        '~~xxx~~xxx~~~~xxx',
        '~x~~x~x~~~x~~x~~x',
        '~x~~x~x~~~x~~x~~x',
        '~x~~x~x~~~x~~x~~x',
        'x~~~x~x~~~x~x~~~x',
        'x~~~x~x~~~x~x~~~x',
        'x~~~x~~xxx~~x~~~x'
      ].join('\n')
    )
  })

  it('works with numbers and punctuation', () => {
    expect(
      krasivo('please, no :(((', 'x', '~')
    ).toBe(
      [
        'xxxx~~x~~~~~xxxxx~~xxx~~~xxxx~xxxxx~~~~~~~~~x~~~x~~xxx~~~~~~~~~~~~x~~~x~~~x',
        'x~~~x~x~~~~~x~~~~~x~~~x~x~~~~~x~~~~~~~~~~~~~x~~~x~x~~~x~~~~~~~~~~x~~~x~~~x~',
        'x~~~x~x~~~~~x~~~~~x~~~x~x~~~~~x~~~~~~~~~~~~~xx~~x~x~~~x~~~~~~x~~x~~~x~~~x~~',
        'xxxx~~x~~~~~xxxx~~xxxxx~~xxx~~xxxx~~~~~~~~~~x~x~x~x~~~x~~~~~~~~~x~~~x~~~x~~',
        'x~~~~~x~~~~~x~~~~~x~~~x~~~~~x~x~~~~~~~~~~~~~x~~xx~x~~~x~~~~~~x~~x~~~x~~~x~~',
        'x~~~~~x~~~~~x~~~~~x~~~x~~~~~x~x~~~~~~x~~~~~~x~~~x~x~~~x~~~~~~~~~~x~~~x~~~x~',
        'x~~~~~xxxxx~xxxxx~x~~~x~xxxx~~xxxxx~x~~~~~~~x~~~x~~xxx~~~~~~~~~~~~x~~~x~~~x'
      ].join('\n')
    )
  })

  it('throws an error when given unsupported symbols', () => {
    expect(() => {
      krasivo('π', 'x', '~')
    }).toThrowError('Unsupported symbol: π')
  })

  it('converts input to string', () => {
    expect(
      krasivo(1, 'x', '~')
    ).toBe(
      [
        '~~x',
        '~xx',
        'x~x',
        '~~x',
        '~~x',
        '~~x',
        '~~x',
      ].join('\n')
    )
  })

  it('works with upper case', () => {
    expect(
      krasivo('lol', 'x', 'o')
    ).toBe(
      krasivo('LOL', 'x', 'o')
    )
  })

  describe('shortEmoji', () => {
    it('converts emoji names to emoji symbols when shortEmoji is true', () => {
      expect(
        krasivo('lol', ':no_good:', ' ', { shortEmoji: true })
      ).toBe(
        [
          '🙅      🙅🙅🙅  🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅🙅🙅🙅🙅  🙅🙅🙅  🙅🙅🙅🙅🙅'
        ].join('\n')
      )
    })

    it('supports Slack skin tones', () => {
      expect(
        krasivo('lol', ':no_good::skin-tone-2:', ' ', { shortEmoji: true })
      ).toBe(
        [
          '🙅🏻      🙅🏻🙅🏻🙅🏻  🙅🏻    ',
          '🙅🏻     🙅🏻   🙅🏻 🙅🏻    ',
          '🙅🏻     🙅🏻   🙅🏻 🙅🏻    ',
          '🙅🏻     🙅🏻   🙅🏻 🙅🏻    ',
          '🙅🏻     🙅🏻   🙅🏻 🙅🏻    ',
          '🙅🏻     🙅🏻   🙅🏻 🙅🏻    ',
          '🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻  🙅🏻🙅🏻🙅🏻  🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻'
        ].join('\n')
      )
    })

    it('does not convert to emoji when no emoji found by name', () => {
      expect(
        krasivo('1', ':no_goody:', ' ', { shortEmoji: true })
      ).toBe(
        [
          '  :no_goody:',
          ' :no_goody::no_goody:',
          ':no_goody: :no_goody:',
          '  :no_goody:',
          '  :no_goody:',
          '  :no_goody:',
          '  :no_goody:'
        ].join('\n')
      )
    })

    it('does not convert to emoji when shortEmoji is false', () => {
      expect(
        krasivo('1', ':no_good:', ' ', { shortEmoji: false })
      ).toBe(
        [
          '  :no_good:',
          ' :no_good::no_good:',
          ':no_good: :no_good:',
          '  :no_good:',
          '  :no_good:',
          '  :no_good:',
          '  :no_good:'
        ].join('\n')
      )
    })
  })
})
