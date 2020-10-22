import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GetServerSideProps } from "next"
import { openDB } from '../../../../openDB'
import { CarModel } from '../../../../../api/Car'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    img: {
      width: '100%',
    },
  }));
  
  interface CarDetailsProps {
    car: CarModel | null | undefined;
}

export default function CarDetails ({ car }: CarDetailsProps) {
    if(!car) {
        return <h1>Sorry, car not defined</h1>
    }

    const classes = useStyles()

    return (
        <div>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={5}>
                <img className={classes.img} alt="complex" src={car.photoUrl} />
              </Grid>
              <Grid item xs={12} sm={6} md={7} container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography variant="h5">
                      {car.make + ' ' + car.model}
                    </Typography>
                    <Typography gutterBottom variant="h4">
                      £{car.price}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary">
                      Year: {car.year}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary">
                      KMs: {car.kilometers}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary">
                      Fuel Type: {car.fuelType}
                    </Typography>
                    <Typography gutterBottom variant="body1" color="textSecondary">
                      Details: {car.details}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const id = ctx.params.id

    const db = await openDB()
    const car = await db.get<CarModel | undefined>('SELECT * FROM Car WHERE id = ?', id)

    return {
        props: {
            car: car || null
        }
    }
}