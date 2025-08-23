import { useEffect } from 'react'


interface BootstrapModalProps {
  id: string
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'lg' | 'xl'
}

export default function BootstrapModal({ 
    id, 
    header, 
    body, 
    footer,
    size 
    }: BootstrapModalProps) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js')
    }, [])
    return (
        <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={`${id}-Label`} aria-hidden="true">
        <div className={`modal-dialog modal-dialog-centered ${size ? `modal-${size}` : 'modal-lg'}`}>
            <div className="modal-content">
            {header && (
                <div className="modal-header">
                <h5 className="modal-title" id={`${id}Label`}>{header}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            )}
            {body && (
                <div className="modal-body">
                {body}
                </div>
            )}
            {footer && (
                <div className="modal-footer">
                {footer}
                </div>
            )}
            </div>
        </div>
        </div>
    );
}
