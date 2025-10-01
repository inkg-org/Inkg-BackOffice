'use client'

import React from 'react'
import ModalBuilder, { ModalBuilderProps } from './ModalBuilder'

export interface EagerModalProps extends ModalBuilderProps {}
const EagerModal = (props: EagerModalProps) => {
  return <ModalBuilder {...props} />
}

export default EagerModal
