export type CredentialRow = Record<string, any>

export const getCredentialDates = (
  credentialName: string,
  row: CredentialRow
): { issue: string | null; expiration: string | null } => {
  switch (credentialName) {
    case 'Identification Card':
      return {
        issue: row.identification_card_issue_date || null,
        expiration: row.identification_card_expiration_date || null
      }
    case 'Official Passport Card':
      return {
        issue: row.official_passport_issue_date || null,
        expiration: row.official_passport_expiration_date || null
      }
    case 'Driver License Card':
      return {
        issue: row.driver_license_issue_date || null,
        expiration: row.driver_license_expiration_date || null
      }
    case 'Medical Cannabis Patient Card':
      return {
        issue: row.marijuana_patient_issue_date || null,
        expiration: row.marijuana_patient_expiration_date || null
      }
    case 'Medical Mushroom Patient Card':
      return {
        issue: row.mushroom_patient_issue_date || null,
        expiration: row.mushroom_patient_expiration_date || null
      }
    case 'Concealed Weapon or Firearm License':
      return {
        issue: row.concealed_weapon_issue_date || null,
        expiration: row.concealed_weapon_expiration_date || null
      }
    case 'Diplomatic Passport Card':
      return {
        issue: row.diplomatic_passport_issue_date || null,
        expiration: row.diplomatic_passport_expiration_date || null
      }
    case 'Fish And Game License Card':
      return {
        issue: row.fish_and_game_issue_date || null,
        expiration: row.fish_and_game_expiration_date || null
      }
    case 'Passport Card':
      return {
        issue: row.passport_card_issue_date || null,
        expiration: row.passport_card_expiration_date || null
      }
    default:
      return {
        issue: null,
        expiration: null
      }
  }
}
