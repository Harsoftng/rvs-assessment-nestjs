export class TextHelper {
  public static trim(value: any): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  public static escapeSpecialCharacters(value: any): string {
    return typeof value === 'string'
      ? value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\\+/g, '\\')
      : '';
  }

  public static sanitize(value: any): string {
    return typeof value === 'string'
      ? value.replace(/[^a-z0-9áéíóúñü.,_=-]/gim, '').trim()
      : '';
  }
}
