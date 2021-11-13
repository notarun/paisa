import { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'

import { useStore } from '../../store'

interface BaseModalProps {
  title: string;
  show: boolean;
  children: ComponentChildren;
  closeModal: () => void;
  deleteResource?: () => void;
  formId?: string;
}

export const BaseModal = ({ title, show, children, closeModal, deleteResource, formId }: BaseModalProps) => (
  <div className={`modal modal-lg ${show && 'active'}`}>
    <a className="modal-overlay" aria-label="Close" onClick={() => closeModal()}></a>
    <div className="modal-container container grid-xs">
      <div className="modal-header">
        <button className="btn btn-clear float-right" aria-label="Close" onClick={() => closeModal()}></button>
        <div className="modal-title h5">{ title }</div>
      </div>

      <div className="modal-body">
        <div className="content">
          {children}
        </div>
      </div>

      <div className="modal-footer">
        {formId && (
          <div class="btn-group btn-group-block mb-2">
            <button form={formId} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
        {deleteResource && (
          <div class="btn-group btn-group-block mb-2">
            <button
              className="btn btn-error"
              onClick={() => (deleteResource(), closeModal())}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)
