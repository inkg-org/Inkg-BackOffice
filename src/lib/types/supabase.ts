/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)'
  }
  public: {
    Tables: {
      credentials: {
        Row: {
          concealed_weapon_card_number: string
          concealed_weapon_discriminator: string
          concealed_weapon_expiration_date: string | null
          concealed_weapon_initial_year: string
          concealed_weapon_issue_date: string | null
          concealed_weapon_Qrcode: string
          created_at: string
          credential_name: Database['public']['Enums']['credentials_types']
          diplomatic_passport_DAN: string
          diplomatic_passport_discriminator: string
          diplomatic_passport_expiration_date: string | null
          diplomatic_passport_initial_year: string
          diplomatic_passport_issue_date: string | null
          diplomatic_passport_mission: string
          diplomatic_passport_MRZLine1: string
          diplomatic_passport_MRZLine2: string
          diplomatic_passport_MRZLine3: string
          diplomatic_passport_number: string
          diplomatic_passport_position: string
          diplomatic_passport_Qrcode: string
          driver_license_card_number: string
          driver_license_class: string
          driver_license_discriminator: string
          driver_license_endorsement: string
          driver_license_expiration_date: string | null
          driver_license_initial_year: string
          driver_license_issue_date: string | null
          driver_license_Qrcode: string
          driver_license_restriction: string
          fish_and_game_discriminator: string
          fish_and_game_expiration_date: string | null
          fish_and_game_initial_year: string
          fish_and_game_issue_date: string | null
          fish_and_game_number: string
          fish_and_game_Qrcode: string
          id: string
          identification_card_discriminator: string
          identification_card_expiration_date: string | null
          identification_card_initial_year: string
          identification_card_issue_date: string | null
          identification_card_number: string
          identification_card_Qrcode: string
          marijuana_patient_card_number: string
          Marijuana_patient_caregiver: string
          marijuana_patient_discriminator: string
          marijuana_patient_expiration_date: string | null
          marijuana_patient_id: string
          marijuana_patient_inicial_year: string
          marijuana_patient_issue_date: string | null
          marijuana_patient_QrCode: string
          mushroom_patient_card_number: string
          mushroom_patient_caregivers: string
          mushroom_patient_discriminator: string
          mushroom_patient_expiration_date: string | null
          mushroom_patient_id: string
          mushroom_patient_inicial_year: string
          mushroom_patient_issue_date: string | null
          mushroom_patient_Qrcode: string
          official_passport_DAN: string
          official_passport_discriminator: string
          official_passport_expiration_date: string | null
          official_passport_initial_year: string
          official_passport_issue_date: string | null
          official_passport_mission: string
          official_passport_MRZLine1: string
          official_passport_MRZLine2: string
          official_passport_MRZLine3: string
          official_passport_number: string
          official_passport_position: string
          official_passport_Qrcode: string
          passport_card_discriminator: string
          passport_card_expiration_date: string | null
          passport_card_initial_year: string
          passport_card_issue_date: string | null
          passport_card_MRZLine1: string
          passport_card_MRZLine2: string
          passport_card_MRZLine3: string
          passport_card_number: string
          passport_card_Qrcode: string
          profile_id: string
        }
        Insert: {
          concealed_weapon_card_number?: string
          concealed_weapon_discriminator?: string
          concealed_weapon_expiration_date?: string | null
          concealed_weapon_initial_year?: string
          concealed_weapon_issue_date?: string | null
          concealed_weapon_Qrcode?: string
          created_at?: string
          credential_name: Database['public']['Enums']['credentials_types']
          diplomatic_passport_DAN?: string
          diplomatic_passport_discriminator?: string
          diplomatic_passport_expiration_date?: string | null
          diplomatic_passport_initial_year?: string
          diplomatic_passport_issue_date?: string | null
          diplomatic_passport_mission?: string
          diplomatic_passport_MRZLine1?: string
          diplomatic_passport_MRZLine2?: string
          diplomatic_passport_MRZLine3?: string
          diplomatic_passport_number?: string
          diplomatic_passport_position?: string
          diplomatic_passport_Qrcode?: string
          driver_license_card_number?: string
          driver_license_class?: string
          driver_license_discriminator?: string
          driver_license_endorsement?: string
          driver_license_expiration_date?: string | null
          driver_license_initial_year?: string
          driver_license_issue_date?: string | null
          driver_license_Qrcode?: string
          driver_license_restriction?: string
          fish_and_game_discriminator?: string
          fish_and_game_expiration_date?: string | null
          fish_and_game_initial_year?: string
          fish_and_game_issue_date?: string | null
          fish_and_game_number?: string
          fish_and_game_Qrcode?: string
          id?: string
          identification_card_discriminator?: string
          identification_card_expiration_date?: string | null
          identification_card_initial_year?: string
          identification_card_issue_date?: string | null
          identification_card_number?: string
          identification_card_Qrcode?: string
          marijuana_patient_card_number?: string
          Marijuana_patient_caregiver?: string
          marijuana_patient_discriminator?: string
          marijuana_patient_expiration_date?: string | null
          marijuana_patient_id?: string
          marijuana_patient_inicial_year?: string
          marijuana_patient_issue_date?: string | null
          marijuana_patient_QrCode?: string
          mushroom_patient_card_number?: string
          mushroom_patient_caregivers?: string
          mushroom_patient_discriminator?: string
          mushroom_patient_expiration_date?: string | null
          mushroom_patient_id?: string
          mushroom_patient_inicial_year?: string
          mushroom_patient_issue_date?: string | null
          mushroom_patient_Qrcode?: string
          official_passport_DAN?: string
          official_passport_discriminator?: string
          official_passport_expiration_date?: string | null
          official_passport_initial_year?: string
          official_passport_issue_date?: string | null
          official_passport_mission?: string
          official_passport_MRZLine1?: string
          official_passport_MRZLine2?: string
          official_passport_MRZLine3?: string
          official_passport_number?: string
          official_passport_position?: string
          official_passport_Qrcode?: string
          passport_card_discriminator?: string
          passport_card_expiration_date?: string | null
          passport_card_initial_year?: string
          passport_card_issue_date?: string | null
          passport_card_MRZLine1?: string
          passport_card_MRZLine2?: string
          passport_card_MRZLine3?: string
          passport_card_number?: string
          passport_card_Qrcode?: string
          profile_id: string
        }
        Update: {
          concealed_weapon_card_number?: string
          concealed_weapon_discriminator?: string
          concealed_weapon_expiration_date?: string | null
          concealed_weapon_initial_year?: string
          concealed_weapon_issue_date?: string | null
          concealed_weapon_Qrcode?: string
          created_at?: string
          credential_name?: Database['public']['Enums']['credentials_types']
          diplomatic_passport_DAN?: string
          diplomatic_passport_discriminator?: string
          diplomatic_passport_expiration_date?: string | null
          diplomatic_passport_initial_year?: string
          diplomatic_passport_issue_date?: string | null
          diplomatic_passport_mission?: string
          diplomatic_passport_MRZLine1?: string
          diplomatic_passport_MRZLine2?: string
          diplomatic_passport_MRZLine3?: string
          diplomatic_passport_number?: string
          diplomatic_passport_position?: string
          diplomatic_passport_Qrcode?: string
          driver_license_card_number?: string
          driver_license_class?: string
          driver_license_discriminator?: string
          driver_license_endorsement?: string
          driver_license_expiration_date?: string | null
          driver_license_initial_year?: string
          driver_license_issue_date?: string | null
          driver_license_Qrcode?: string
          driver_license_restriction?: string
          fish_and_game_discriminator?: string
          fish_and_game_expiration_date?: string | null
          fish_and_game_initial_year?: string
          fish_and_game_issue_date?: string | null
          fish_and_game_number?: string
          fish_and_game_Qrcode?: string
          id?: string
          identification_card_discriminator?: string
          identification_card_expiration_date?: string | null
          identification_card_initial_year?: string
          identification_card_issue_date?: string | null
          identification_card_number?: string
          identification_card_Qrcode?: string
          marijuana_patient_card_number?: string
          Marijuana_patient_caregiver?: string
          marijuana_patient_discriminator?: string
          marijuana_patient_expiration_date?: string | null
          marijuana_patient_id?: string
          marijuana_patient_inicial_year?: string
          marijuana_patient_issue_date?: string | null
          marijuana_patient_QrCode?: string
          mushroom_patient_card_number?: string
          mushroom_patient_caregivers?: string
          mushroom_patient_discriminator?: string
          mushroom_patient_expiration_date?: string | null
          mushroom_patient_id?: string
          mushroom_patient_inicial_year?: string
          mushroom_patient_issue_date?: string | null
          mushroom_patient_Qrcode?: string
          official_passport_DAN?: string
          official_passport_discriminator?: string
          official_passport_expiration_date?: string | null
          official_passport_initial_year?: string
          official_passport_issue_date?: string | null
          official_passport_mission?: string
          official_passport_MRZLine1?: string
          official_passport_MRZLine2?: string
          official_passport_MRZLine3?: string
          official_passport_number?: string
          official_passport_position?: string
          official_passport_Qrcode?: string
          passport_card_discriminator?: string
          passport_card_expiration_date?: string | null
          passport_card_initial_year?: string
          passport_card_issue_date?: string | null
          passport_card_MRZLine1?: string
          passport_card_MRZLine2?: string
          passport_card_MRZLine3?: string
          passport_card_number?: string
          passport_card_Qrcode?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'credentials_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      profile: {
        Row: {
          address: string
          birth: string
          birth_place: string
          certificate_number: string
          city: string
          clan: Database['public']['Enums']['clan'] | null
          clan_image: string
          country: string
          created_at: string
          DOB_short: string
          eye_color: Database['public']['Enums']['eye_color']
          fingerprints: string
          first_name: string
          gender: Database['public']['Enums']['gender']
          hair_color: Database['public']['Enums']['hair_color'] | null
          has_CDLD_driver_license: boolean | null
          has_concealed_carry: boolean | null
          has_diplomatic_passport: boolean | null
          has_driver_license: boolean | null
          has_fish_and_game: boolean | null
          has_identification_card: boolean | null
          has_official_passport: boolean | null
          has_passport_card: boolean | null
          height: string
          id: string
          is_marijuana_patient: boolean
          is_mushroom_patient: boolean | null
          last_name: string
          middle_name: string
          nacionality: string
          phone: string
          photo: string
          secondary_address: string
          sign: string
          state: string
          weight: number
          zip_code: number
        }
        Insert: {
          address?: string
          birth?: string
          birth_place?: string
          certificate_number?: string
          city?: string
          clan?: Database['public']['Enums']['clan'] | null
          clan_image?: string
          country?: string
          created_at?: string
          DOB_short?: string
          eye_color?: Database['public']['Enums']['eye_color']
          fingerprints?: string
          first_name?: string
          gender?: Database['public']['Enums']['gender']
          hair_color?: Database['public']['Enums']['hair_color'] | null
          has_CDLD_driver_license?: boolean | null
          has_concealed_carry?: boolean | null
          has_diplomatic_passport?: boolean | null
          has_driver_license?: boolean | null
          has_fish_and_game?: boolean | null
          has_identification_card?: boolean | null
          has_official_passport?: boolean | null
          has_passport_card?: boolean | null
          height?: string
          id?: string
          is_marijuana_patient?: boolean
          is_mushroom_patient?: boolean | null
          last_name?: string
          middle_name?: string
          nacionality?: string
          phone?: string
          photo?: string
          secondary_address?: string
          sign?: string
          state?: string
          weight?: number
          zip_code?: number
        }
        Update: {
          address?: string
          birth?: string
          birth_place?: string
          certificate_number?: string
          city?: string
          clan?: Database['public']['Enums']['clan'] | null
          clan_image?: string
          country?: string
          created_at?: string
          DOB_short?: string
          eye_color?: Database['public']['Enums']['eye_color']
          fingerprints?: string
          first_name?: string
          gender?: Database['public']['Enums']['gender']
          hair_color?: Database['public']['Enums']['hair_color'] | null
          has_CDLD_driver_license?: boolean | null
          has_concealed_carry?: boolean | null
          has_diplomatic_passport?: boolean | null
          has_driver_license?: boolean | null
          has_fish_and_game?: boolean | null
          has_identification_card?: boolean | null
          has_official_passport?: boolean | null
          has_passport_card?: boolean | null
          height?: string
          id?: string
          is_marijuana_patient?: boolean
          is_mushroom_patient?: boolean | null
          last_name?: string
          middle_name?: string
          nacionality?: string
          phone?: string
          photo?: string
          secondary_address?: string
          sign?: string
          state?: string
          weight?: number
          zip_code?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blood_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
      clan: 'Bear Clan' | 'Wolf Clan' | 'Turtle Clan'
      credentials_types:
        | 'Identification Card'
        | 'Passport Card'
        | 'Driver License Card'
        | 'Diplomatic Passport Card'
        | 'Official Passport Card'
        | 'Medical Cannabis Patient Card'
        | 'Medical Mushroom Patient Card'
        | 'Concealed Weapon or Firearm License'
        | 'Fish And Game License Card'
      document_type:
        | 'Adoption Certificate'
        | 'Probationary Certificate'
        | 'Resident Certificate'
      eye_color:
        | 'BLK'
        | 'BLU'
        | 'BRO'
        | 'GRY'
        | 'GRN'
        | 'HAZ'
        | 'MAR'
        | 'PNK'
        | 'DIC'
        | 'UNK'
      gender: 'Male' | 'Female' | 'Other'
      hair_color:
        | 'BAL'
        | 'BLK'
        | 'BLN'
        | 'BRO'
        | 'GRY'
        | 'RED'
        | 'SDY'
        | 'WHI'
        | 'UNK'
        | 'BLU'
        | 'GRN'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      blood_type: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      clan: ['Bear Clan', 'Wolf Clan', 'Turtle Clan'],
      credentials_types: [
        'Identification Card',
        'Passport Card',
        'Driver License Card',
        'Diplomatic Passport Card',
        'Official Passport Card',
        'Medical Cannabis Patient Card',
        'Medical Mushroom Patient Card',
        'Concealed Weapon or Firearm License',
        'Fish And Game License Card'
      ],
      document_type: [
        'Adoption Certificate',
        'Probationary Certificate',
        'Resident Certificate'
      ],
      eye_color: [
        'BLK',
        'BLU',
        'BRO',
        'GRY',
        'GRN',
        'HAZ',
        'MAR',
        'PNK',
        'DIC',
        'UNK'
      ],
      gender: ['Male', 'Female', 'Other'],
      hair_color: [
        'BAL',
        'BLK',
        'BLN',
        'BRO',
        'GRY',
        'RED',
        'SDY',
        'WHI',
        'UNK',
        'BLU',
        'GRN'
      ]
    }
  }
} as const
