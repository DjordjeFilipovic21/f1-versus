import {CircuitState} from './circuit-state';
import {BelgiumState} from './states/belgium-state';
import {MonacoState} from './states/monaco-state';
import {SuzukaState} from './states/suzuka-state';
import {SilverstoneState} from './states/silverstone-state';
import {ZandvoortState} from './states/zandvoort-state';
import {MonzaState} from './states/monza-state';
import {BakuState} from './states/baku-state';
import {InterlagosState} from './states/interlagos-state';
import {LasVegasState} from './states/las-vegas-state';
import {LusailState} from './states/lusail-state';
import {YasMarinaState} from './states/yas-marina-state';
import {SingaporeState} from './states/singapore-state';
import {AustinState} from './states/austin-state';
import {MexicoCityState} from './states/mexico-city-state';
import {SakhirState} from './states/sakhir-state';
import {MelbourneState} from './states/melbourne-state';
import {JeddahState} from './states/jeddah-state';
import {ShanghaiState} from './states/shanghai-state';
import {MiamiState} from './states/miami-state';
import {ImolaState} from './states/imola-state';
import {CatalunyaState} from './states/catalunya-state';
import {SpielbergState} from './states/spielberg-state';
import {MontrealState} from './states/montreal-state';
import {Injectable, Injector} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CircuitStateFactory {
  // @ts-ignore
  private stateMap = new Map<string, new () => CircuitState>([
    ['Spa-Francorchamps', BelgiumState],
    ['Monte Carlo', MonacoState],
    ['Zandvoort', ZandvoortState],
    ['Silverstone', SilverstoneState],
    ['Suzuka', SuzukaState],
    ['Monza', MonzaState],
    ['Baku', BakuState],
    ['Interlagos', InterlagosState],
    ['Las Vegas', LasVegasState],
    ['Lusail', LusailState],
    ['Yas Marina Circuit', YasMarinaState],
    ['Singapore', SingaporeState],
    ['Austin', AustinState],
    ['Mexico City', MexicoCityState],
    ['Sakhir', SakhirState],
    ['Melbourne', MelbourneState],
    ['Jeddah', JeddahState],
    ['Shanghai', ShanghaiState],
    ['Miami', MiamiState],
    ['Imola', ImolaState],
    ['Catalunya', CatalunyaState],
    ['Spielberg', SpielbergState],
    ['Montreal', MontrealState],
  ]);

  constructor(private injector: Injector) {}


  getCircuitState(id: string): CircuitState {
    const StateClass = this.stateMap.get(id);
    if (StateClass) {
      return this.injector.get(StateClass);
    } else {
      throw new Error('Circuit state not found!');
    }
  }


}
