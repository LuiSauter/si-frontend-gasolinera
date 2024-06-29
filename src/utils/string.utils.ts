export function getFirstLetterOfEachWord(sentence?: string): string {
  if (!sentence) {
    return ''
  }
  return sentence.split(' ').map(word => word.substring(0, 1)).join('')
}
