const { Markup: m } = require('telegraf')
const formatAddress = require('../utils/format_address')

module.exports = (addresses, pagination, i18n) => {
  const buttons = addresses.map(({ _id, address, tag }) => {
    const text = tag
      ? `${tag}: ${formatAddress(address)}`
      : formatAddress(address)
    return [m.callbackButton(text, `open_${_id}`)]
  })

  const navigationButtons = []

  if (!pagination.is_first_page) {
    navigationButtons.push(
      m.callbackButton(
        i18n.t('buttons.prev-page'),
        `list_${pagination.prev_offset}`,
      ),
    )
  }

  if (!pagination.is_last_page) {
    navigationButtons.push(
      m.callbackButton(
        i18n.t('buttons.next-page'),
        `list_${pagination.next_offset}`,
      ),
    )
  }

  return m.inlineKeyboard([...buttons, navigationButtons])
}