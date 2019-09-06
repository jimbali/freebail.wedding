export interface IGuest {
  id: number,
  name: string,
  invite_code: string,
  invite_link: string | null,
  invite_sent: string | null,
  count: number
}