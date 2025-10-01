export default interface IMutationOptions {
  onSuccess?: () => void
  onError?: () => void
  onMutate?: () => void
  onSettled?: () => void
}
