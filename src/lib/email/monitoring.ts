export const EMAIL_MONITOR_RECIPIENT = process.env.EMAIL_MONITOR_RECIPIENT || 'mail@alabrida.org'

export function monitorBcc(to: string | string[]) {
  const recipients = Array.isArray(to) ? to : [to]
  const isAlreadyIncluded = recipients.some(
    (recipient) => recipient.toLowerCase() === EMAIL_MONITOR_RECIPIENT.toLowerCase()
  )

  return isAlreadyIncluded ? undefined : EMAIL_MONITOR_RECIPIENT
}
