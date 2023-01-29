import './FormModal.css'


const FormModal = (props) => {
    return (
        <div className="modal fade text-start" id="addTaskModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={props.formFunc}>
                        <div className="modal-body">							
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label">Category</label>
                                <input name='task_category' onChange={props.handleInputOne} value={props.inputOne} type="text" className="form-control" id="recipient-name" />
                                <span className="text-danger">{props.errOne}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Task:</label>
                                <textarea name='task_content' onChange={props.handleInputTwo} value={props.inputTwo} className="form-control" id="message-text"></textarea>
                                <span className="text-danger">{props.errTwo}</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id='closeBtn' data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary btn-submit" id='saveBtn'>{props.btn}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            
    )
}

export default FormModal