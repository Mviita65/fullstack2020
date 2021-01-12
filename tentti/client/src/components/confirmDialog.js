import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { poistaTenttiKurssilta } from './dataManipulation';
import '../oma.css';


const ConfirmDialog = (props) => {
  const { otsikko, teksti, vahvista, setVahvista, onConfirmAction, dispatch, data, tenttiIndex, kurssi } = props;
  return (
    <Dialog
      open={vahvista}
      onClose={() => setVahvista(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{otsikko}</DialogTitle>
      <DialogContent>{teksti}</DialogContent>
      <DialogActions>
        <button 
          className="button"
          // variant="contained"
          onClick={() => {
            switch (props.onConfirmAction) {
              case "poistaTenttiKurssilta" :  
                console.log(onConfirmAction)
                poistaTenttiKurssilta(dispatch, data, tenttiIndex, kurssi)
                setVahvista(false)
                return
              default : throw new Error();
            }
          }}
          color="default"
        >
          OK
        </button>
        <button
          className="button" 
          // variant="contained"
          onClick={() => setVahvista(false)}
          color="secondary"
        >
          Peruuta
        </button>
      </DialogActions>
    </Dialog>
  );
};export default ConfirmDialog;